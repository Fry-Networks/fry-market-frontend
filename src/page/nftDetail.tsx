import { useEffect } from 'react';
import ReadyForNext from "../components/home/readyForNext";
import MoreFromThis from '../components/nftDetail/moreFromThis';
import NftDetailBanner from '../components/nftDetail/nftDetailBanner';

const NftDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>

      <NftDetailBanner detail={false} />
      <MoreFromThis />
      <ReadyForNext />


    </>
  )
}

export default NftDetail;