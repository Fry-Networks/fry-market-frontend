import React from 'react'
import ProfileBanner from '../components/artistProfile/profileBanner'
import PixacioBanner from '../components/topCollection/pixacioBanner'
import CollectionCard from '../components/sellerCollection/collectionCards'

const ArtistProfileArt = () => {
  return (
 <>
 <ProfileBanner/>
 <CollectionCard isArtistProfile={true} />
 </>
  )
}

export default ArtistProfileArt