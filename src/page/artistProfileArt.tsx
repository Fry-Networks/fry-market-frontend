import ProfileBanner from '../components/artistProfile/profileBanner'
import CollectionCard from '../components/sellerCollection/collectionCards'

const ArtistProfileArt = () => {
  return (
    <>
      <ProfileBanner />
      <CollectionCard isArtistProfile={true} />
    </>
  )
}

export default ArtistProfileArt