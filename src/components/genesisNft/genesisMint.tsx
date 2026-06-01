import { Icon } from '@iconify/react'
import { Progress } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useChain } from '../../contexts/ChainContext'
import { useMultiChainWallet } from '../../hooks/useMultiChainWallet'

const baseUrl = import.meta.env.VITE_API_BASE_URL

interface MintStats {
  total_supply: number
  minted: number
  price_usdc: number
  is_active: boolean
}

const GenesisMint = () => {
  const { hasFeature, chainId } = useChain()
  const { activeAddress, isConnected } = useMultiChainWallet()
  const [stats, setStats] = useState<MintStats>({
    total_supply: 1000,
    minted: 0,
    price_usdc: 175,
    is_active: false,
  })
  const [minting, setMinting] = useState(false)

  const fetchMintStats = async () => {
    try {
      const response = await axios.get(`${baseUrl}/genesis/mint-stats`)
      if (response.data) setStats(response.data)
    } catch {
      // Use defaults
    }
  }

  useEffect(() => {
    if (hasFeature('genesisNft')) {
      fetchMintStats()
    }
  }, [chainId])

  if (!hasFeature('genesisNft')) {
    return null
  }

  const mintProgress = Math.round((stats.minted / stats.total_supply) * 100)
  const remaining = stats.total_supply - stats.minted
  const isSoldOut = remaining <= 0

  const handleMint = async () => {
    if (!isConnected || !activeAddress || minting || isSoldOut || !stats.is_active) return
    setMinting(true)
    try {
      // TODO: Integrate with GenesisNFT contract mint method
      // 1. Build USDC payment txn (175 USDC to contract)
      // 2. Build app call to genesis_nft.mint()
      // 3. Sign + submit atomic group
      alert('Genesis NFT minting will be available after mainnet contract deployment.')
    } catch {
      // Error handling
    } finally {
      setMinting(false)
    }
  }

  return (
    <div className="container mb-16">
      <div
        className="max-w-[500px] mx-auto rounded-2xl p-8"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <h3 className="font-Apex text-xl uppercase mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
          Mint a Genesis NFT
        </h3>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: 'var(--text-secondary)' }}>
              {stats.minted} / {stats.total_supply} minted
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>{mintProgress}%</span>
          </div>
          <Progress percent={mintProgress} showInfo={false} strokeColor="var(--primary)" />
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {remaining} remaining
          </p>
        </div>

        <div
          className="rounded-xl p-4 mb-6 flex items-center justify-between"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <div className="flex items-center gap-2">
            <Icon icon="cryptocurrency-color:usdc" width={24} height={24} />
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              Price
            </span>
          </div>
          <span className="text-xl font-bold font-Apex" style={{ color: 'var(--text-primary)' }}>
            {stats.price_usdc} USDC
          </span>
        </div>

        <button
          onClick={handleMint}
          disabled={!isConnected || minting || isSoldOut || !stats.is_active}
          className="w-full py-3.5 rounded-xl font-Roboto font-bold text-white text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: isSoldOut ? 'var(--text-muted)' : 'var(--primary)' }}
        >
          {!isConnected
            ? 'Connect Wallet to Mint'
            : isSoldOut
              ? 'Sold Out'
              : !stats.is_active
                ? 'Minting Not Active'
                : minting
                  ? 'Minting...'
                  : 'Mint Genesis NFT'}
        </button>

        <p className="text-xs text-center mt-3" style={{ color: 'var(--text-muted)' }}>
          Algorand only. Requires USDC in your wallet.
        </p>
      </div>
    </div>
  )
}

export default GenesisMint
