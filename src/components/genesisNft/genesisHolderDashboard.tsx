import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useChain } from '../../contexts/ChainContext'
import { useMultiChainWallet } from '../../hooks/useMultiChainWallet'

const baseUrl = import.meta.env.VITE_API_BASE_URL

interface EpochInfo {
  current_epoch: number
  epoch_end_date: string
  total_pool_balance: number
  your_share: number
  claimable_fry: number
  owned_count: number
}

const GenesisHolderDashboard = () => {
  const { hasFeature } = useChain()
  const { activeAddress, isConnected } = useMultiChainWallet()
  const [epochInfo, setEpochInfo] = useState<EpochInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [claiming, setClaiming] = useState(false)

  const fetchEpochInfo = async () => {
    if (!activeAddress) return
    try {
      setLoading(true)
      const response = await axios.get(`${baseUrl}/genesis/epoch-info`, {
        params: { wallet: activeAddress },
      })
      setEpochInfo(response.data)
    } catch {
      setEpochInfo(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hasFeature('genesisNft') && isConnected) {
      fetchEpochInfo()
    }
  }, [activeAddress, isConnected])

  if (!hasFeature('genesisNft') || !isConnected) {
    return null
  }

  if (loading) {
    return (
      <div className="container mb-20">
        <div className="flex justify-center py-10">
          <Icon icon="eos-icons:loading" width={32} height={32} style={{ color: 'var(--primary)' }} />
        </div>
      </div>
    )
  }

  if (!epochInfo || epochInfo.owned_count === 0) {
    return null
  }

  const handleClaim = async () => {
    if (claiming || !epochInfo?.claimable_fry) return
    setClaiming(true)
    try {
      // TODO: Integrate with DistributionPool.claim() contract method
      // 1. Build app call to distribution_pool.claim()
      // 2. Sign + submit
      alert('Epoch claim will be available after mainnet contract deployment.')
    } catch {
      // Error handling
    } finally {
      setClaiming(false)
    }
  }

  return (
    <div className="container mb-20">
      <h2 className="font-Apex text-2xl uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
        Holder Dashboard
      </h2>

      <div
        className="rounded-2xl p-6"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
              Your Genesis NFTs
            </p>
            <p className="text-2xl font-bold font-Apex" style={{ color: 'var(--text-primary)' }}>
              {epochInfo.owned_count}
            </p>
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
              Current Epoch
            </p>
            <p className="text-2xl font-bold font-Apex" style={{ color: 'var(--text-primary)' }}>
              #{epochInfo.current_epoch}
            </p>
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
              Pool Balance
            </p>
            <p className="text-2xl font-bold font-Apex" style={{ color: 'var(--text-primary)' }}>
              {epochInfo.total_pool_balance.toLocaleString()} FRY
            </p>
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
              Your Share
            </p>
            <p className="text-2xl font-bold font-Apex" style={{ color: 'var(--primary)' }}>
              {epochInfo.your_share.toFixed(2)}%
            </p>
          </div>
        </div>

        <div
          className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Claimable FRY Rewards
            </p>
            <p className="text-xl font-bold font-Apex" style={{ color: 'var(--text-primary)' }}>
              {epochInfo.claimable_fry.toLocaleString()} FRY
            </p>
          </div>
          <button
            onClick={handleClaim}
            disabled={claiming || !epochInfo.claimable_fry}
            className="px-6 py-2.5 rounded-xl font-Roboto font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'var(--primary)' }}
          >
            {claiming ? 'Claiming...' : 'Claim Rewards'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GenesisHolderDashboard
