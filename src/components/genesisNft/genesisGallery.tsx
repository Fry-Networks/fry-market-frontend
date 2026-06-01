import { Icon } from '@iconify/react'
import { Pagination, Select } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useChain } from '../../contexts/ChainContext'
import Loader from '../Loader'

const baseUrl = import.meta.env.VITE_API_BASE_URL

interface GenesisNftItem {
  token_id: number
  image_url: string
  name: string
  owner: string | null
  is_minted: boolean
}

const PAGE_SIZE = 20

const GenesisGallery = () => {
  const { hasFeature } = useChain()
  const [nfts, setNfts] = useState<GenesisNftItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState<string>('all')

  const fetchGallery = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseUrl}/genesis/gallery`, {
        params: { page, per_page: PAGE_SIZE, filter },
      })
      setNfts(response.data?.items || [])
      setTotal(response.data?.total || 0)
    } catch {
      setNfts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hasFeature('genesisNft')) {
      fetchGallery()
    }
  }, [page, filter])

  if (!hasFeature('genesisNft')) {
    return null
  }

  return (
    <div className="container mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-Apex text-2xl uppercase" style={{ color: 'var(--text-primary)' }}>
          Genesis Collection
        </h2>
        <Select
          value={filter}
          onChange={(val) => {
            setFilter(val)
            setPage(1)
          }}
          style={{ width: 160 }}
          options={[
            { value: 'all', label: 'All' },
            { value: 'minted', label: 'Minted' },
            { value: 'available', label: 'Available' },
          ]}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : nfts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {nfts.map((nft) => (
              <div
                key={nft.token_id}
                className="rounded-xl overflow-hidden transition-all duration-200 hover:translate-y-[-2px]"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <div className="aspect-square relative">
                  {nft.image_url ? (
                    <img src={nft.image_url} alt={nft.name} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: 'var(--bg-secondary)' }}
                    >
                      <Icon icon="material-symbols:image" width={40} height={40} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
                    </div>
                  )}
                  {nft.is_minted && (
                    <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-0.5 text-xs text-white">
                      Owned
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {nft.name || `Genesis #${nft.token_id}`}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {nft.owner ? `${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}` : 'Available'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {total > PAGE_SIZE && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={page}
                total={total}
                pageSize={PAGE_SIZE}
                onChange={setPage}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center py-20" style={{ color: 'var(--text-muted)' }}>
          <Icon icon="material-symbols:collections" width={64} height={64} className="mb-4 opacity-40" />
          <p className="text-lg font-Apex uppercase">Gallery coming soon</p>
          <p className="text-sm mt-2">Genesis NFT artwork will be revealed after minting begins.</p>
        </div>
      )}
    </div>
  )
}

export default GenesisGallery
