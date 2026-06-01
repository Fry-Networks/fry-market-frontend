import { useEffect } from 'react'
import GenesisBanner from '../components/genesisNft/genesisBanner'
import GenesisGallery from '../components/genesisNft/genesisGallery'
import GenesisMint from '../components/genesisNft/genesisMint'
import GenesisHolderDashboard from '../components/genesisNft/genesisHolderDashboard'

const GenesisNft = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <GenesisBanner />
      <GenesisMint />
      <GenesisGallery />
      <GenesisHolderDashboard />
    </div>
  )
}

export default GenesisNft
