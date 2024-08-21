import React from 'react';
import ProfileBanner from './profileBanner';
import ProfileNft from './profileNft';
import PixacioBanner from '../topCollection/pixacioBanner';
import artistImage from "../../assets/artistsProfile/leftImg.png"; 

const ProfilePage = () => {
  return (
 <>
 <ProfileBanner/>
 <PixacioBanner name="WONDERFUL ARTWORK" image={artistImage} />
 <ProfileNft/>
 </>
  )
}

export default ProfilePage;