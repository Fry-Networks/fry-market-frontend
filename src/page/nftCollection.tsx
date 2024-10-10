import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReadyForNext from "../components/home/readyForNext";
import Explore from '../components/nftCollection/explore';
import NftCollectBanner from '../components/nftCollection/nftCollectBanner';

const NftCollection = () => {
  const [collectionDataFull, setCollectionDataFull] = useState<any>([])
  const location = useLocation();
  useEffect(() => {
    console.log("Collection Data Full", location.state);
    if (location?.state?.collectionDataFull) {
      setCollectionDataFull(location.state.collectionDataFull)
    }

  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>

      <NftCollectBanner />
      <Explore collectionDataFull={collectionDataFull} />
      <ReadyForNext />

    </div>
  )
}

export default NftCollection;