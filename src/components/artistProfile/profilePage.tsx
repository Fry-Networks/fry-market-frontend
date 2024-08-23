import artistImage from "../../assets/artistsProfile/leftImg.png";
import PixacioBanner from '../topCollection/pixacioBanner';
import ProfileBanner from './profileBanner';
import ProfileNft from './profileNft';

const ProfilePage = () => {
  return (
    <>
      <ProfileBanner />
      <PixacioBanner name="WONDERFUL ARTWORK" image={artistImage} />
      <ProfileNft />
    </>
  )
}

export default ProfilePage;