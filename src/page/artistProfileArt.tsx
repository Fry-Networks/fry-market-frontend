import { useEffect } from 'react';
import ProfileBanner from '../components/artistProfile/profileBanner'
import CollectionCard from '../components/sellerCollection/collectionCards'

const ArtistProfileArt = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    
      <ProfileBanner />
      <CollectionCard isArtistProfile={true} />
    </>
  )
}

export default ArtistProfileArt