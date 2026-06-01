import { Icon } from '@iconify/react'
import { Progress, Select, Tag } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Countdown from 'react-countdown'
import { useChain } from '../../contexts/ChainContext'
import Loader from '../Loader'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export type LaunchPhase = 'upcoming' | 'whitelist' | 'public' | 'reveal' | 'ended'

export interface LaunchProject {
  _id: string
  project_name: string
  description: string
  image_url?: string
  chain_id: string
  supply: number
  minted: number
  price: number
  mint_asset: string // 'ALGO' | 'USDC' | 'FRY' | 'VOI'
  phase: LaunchPhase
  whitelist_start?: string
  public_start?: string
  reveal_date?: string
  end_date?: string
  creator_wallet: string
  creator_name?: string
  website_url?: string
  twitter_url?: string
}

const PHASE_CONFIG: Record<LaunchPhase, { color: string; icon: string; label: string }> = {
  upcoming: { color: 'default', icon: 'material-symbols:hourglass-top', label: 'UPCOMING' },
  whitelist: { color: 'gold', icon: 'material-symbols:lock', label: 'WHITELIST' },
  public: { color: 'green', icon: 'material-symbols:lock-open', label: 'PUBLIC MINT' },
  reveal: { color: 'purple', icon: 'material-symbols:visibility', label: 'REVEALING' },
  ended: { color: 'default', icon: 'material-symbols:check-circle', label: 'ENDED' },
}

const LaunchCard = ({ launch }: { launch: LaunchProject }) => {
  const mintProgress = launch.supply > 0 ? Math.round((launch.minted / launch.supply) * 100) : 0
  const phaseInfo = PHASE_CONFIG[launch.phase]

  const getCountdownTarget = (): number | null => {
    if (launch.phase === 'upcoming' && launch.whitelist_start) return new Date(launch.whitelist_start).getTime()
    if (launch.phase === 'whitelist' && launch.public_start) return new Date(launch.public_start).getTime()
    if (launch.phase === 'public' && launch.reveal_date) return new Date(launch.reveal_date).getTime()
    return null
  }

  const countdownTarget = getCountdownTarget()

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px]"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div
        className="h-[200px] relative"
        style={{
          background: launch.image_url
            ? `url(${launch.image_url}) center/cover`
            : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
        }}
      >
        <div className="absolute top-3 left-3">
          <Tag color={phaseInfo.color}>
            <Icon icon={phaseInfo.icon} width={14} height={14} className="inline mr-1" />
            {phaseInfo.label}
          </Tag>
        </div>
        <div className="absolute top-3 right-3">
          <Tag>{launch.chain_id === 'algorand-mainnet' ? 'Algorand' : 'Voi'}</Tag>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-Apex text-lg uppercase" style={{ color: 'var(--text-primary)' }}>
            {launch.project_name}
          </h3>
          <div className="flex gap-1">
            {launch.website_url && (
              <a href={launch.website_url} target="_blank" rel="noopener noreferrer">
                <Icon icon="material-symbols:language" width={18} height={18} style={{ color: 'var(--text-muted)' }} />
              </a>
            )}
            {launch.twitter_url && (
              <a href={launch.twitter_url} target="_blank" rel="noopener noreferrer">
                <Icon icon="mdi:twitter" width={18} height={18} style={{ color: 'var(--text-muted)' }} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
          {launch.description}
        </p>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: 'var(--text-secondary)' }}>
              Minted: {launch.minted}/{launch.supply}
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>{mintProgress}%</span>
          </div>
          <Progress percent={mintProgress} showInfo={false} strokeColor="var(--primary)" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            <Icon icon="material-symbols:sell" width={16} height={16} />
            {launch.price} {launch.mint_asset}
          </div>

          {countdownTarget && launch.phase !== 'ended' && (
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              <Countdown
                date={countdownTarget}
                renderer={({ days, hours, minutes, seconds }) => (
                  <span className="font-mono">
                    {days > 0 && `${days}d `}{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                )}
              />
            </div>
          )}
        </div>

        {(launch.phase === 'whitelist' || launch.phase === 'public') && (
          <button
            className="w-full mt-4 py-2.5 rounded-xl font-Roboto font-medium text-white transition-colors"
            style={{ background: 'var(--primary)' }}
          >
            {launch.phase === 'whitelist' ? 'Check Whitelist' : 'Mint Now'}
          </button>
        )}
      </div>
    </div>
  )
}

const LaunchpadList = () => {
  const { chainId, hasFeature } = useChain()
  const [launches, setLaunches] = useState<LaunchProject[]>([])
  const [loading, setLoading] = useState(true)
  const [phaseFilter, setPhaseFilter] = useState<string>('all')

  const fetchLaunches = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseUrl}/launches`, {
        params: { chain_id: chainId },
      })
      setLaunches(response.data || [])
    } catch {
      setLaunches([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLaunches()
  }, [chainId])

  if (!hasFeature('launchpad')) {
    return (
      <div className="container pb-20">
        <div className="flex flex-col items-center py-20" style={{ color: 'var(--text-muted)' }}>
          <Icon icon="material-symbols:rocket-launch" width={64} height={64} className="mb-4 opacity-40" />
          <p className="text-lg font-Apex uppercase">Launchpad not available</p>
          <p className="text-sm mt-2">Launchpad is not yet available on this chain. Switch to Algorand to access launches.</p>
        </div>
      </div>
    )
  }

  const filteredLaunches = phaseFilter === 'all' ? launches : launches.filter((l) => l.phase === phaseFilter)

  return (
    <div className="container pb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-Apex text-2xl uppercase" style={{ color: 'var(--text-primary)' }}>
          Active Launches
        </h2>
        <Select
          value={phaseFilter}
          onChange={setPhaseFilter}
          style={{ width: 160 }}
          options={[
            { value: 'all', label: 'All Phases' },
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'whitelist', label: 'Whitelist' },
            { value: 'public', label: 'Public Mint' },
            { value: 'reveal', label: 'Revealing' },
            { value: 'ended', label: 'Ended' },
          ]}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : filteredLaunches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLaunches.map((launch) => (
            <LaunchCard key={launch._id} launch={launch} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-20" style={{ color: 'var(--text-muted)' }}>
          <Icon icon="material-symbols:rocket-launch" width={64} height={64} className="mb-4 opacity-40" />
          <p className="text-lg font-Apex uppercase">No launches found</p>
          <p className="text-sm mt-2">Check back later for upcoming NFT launches.</p>
        </div>
      )}
    </div>
  )
}

export default LaunchpadList
