import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import footerGrid from '../../assets/home/images/homeImages/footerGrid.png'
import twitter from '../../assets/icons/tweet.png'
import footerLogo from '/src/assets/home/images/footerLogo2.png'
import discord from '/src/assets/icons/discord.svg'
import facebook from '/src/assets/icons/facebook.svg'
import github from '/src/assets/icons/github.svg'
import linkedIn from '/src/assets/icons/linkedin.svg'
import reddit from '/src/assets/icons/reddit.svg'
import telegram from '/src/assets/icons/telegram.svg'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const Footer = () => {
  const [collectionData, setCollectionData] = useState<Record<string, any> | null>(null)
  const [collectionDataFull, setCollectionDataFull] = useState<any[]>([])
  const navigate = useNavigate()

  const getCollectionData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/get-all-collections`)
      if (response?.data?.length > 0) {
        let obj: Record<string, any> = {}
        response?.data?.map((collection: any) => {
          if (typeof collection.collection_address === 'string') {
            obj = {
              ...obj,
              [collection.collection_address]: {
                collection_name: collection.collection_name,
                image_url: collection.image_url,
                ...collection,
              },
            }
            setCollectionDataFull((prev: any[]) => [...prev, collection])
          }
        })
        setCollectionData(obj)
      }
    } catch (e) {
      console.log('Error Getting Collection', e)
      setCollectionData(null)
    }
  }

  useEffect(() => {
    getCollectionData()
  }, [])

  return (
    <>
      <div className="footerWrapper relative bg-gradient-to-br from-gray-800 via-gray-900 to-black py-16 mt-20 overflow-hidden">
        {/* Background Elements */}
        <img src={footerGrid} className="absolute top-0 left-0 w-full h-full object-cover opacity-5" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center mb-6">
                <img src={footerLogo} alt="Fry Market Logo" className="h-12 w-auto" />
              </div>
              <p className="text-gray-300 font-normal font-Roboto leading-relaxed mb-6 max-w-md text-base">
                Fry.market is the world's leading NFTs marketplace where you can discover, sell and bid NFTs. Join our community of creators
                and collectors in the exciting world of digital art.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61561225691313"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-600 hover:border-red-500"
                >
                  <img className="w-5 h-5" src={facebook} alt="Facebook" />
                </a>
                <a
                  href="https://t.me/+zodNDzQtGKQ1MTBh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-600 hover:border-red-500"
                >
                  <img className="w-5 h-5" src={telegram} alt="Telegram" />
                </a>
                <a
                  href="https://linkedin.com/company/fry-networks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-600 hover:border-red-500"
                >
                  <img className="w-5 h-5" src={linkedIn} alt="LinkedIn" />
                </a>
                <a
                  href="https://discord.com/invite/frynetworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-600 hover:border-red-500"
                >
                  <img className="w-5 h-5" src={discord} alt="Discord" />
                </a>
                <a
                  href="https://github.com/FrysCrypto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-600 hover:border-red-500"
                >
                  <img className="w-5 h-5" src={github} alt="GitHub" />
                </a>
                <a
                  href="https://www.reddit.com/r/frynetworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-600 hover:border-red-500"
                >
                  <img className="w-5 h-5" src={reddit} alt="Reddit" />
                </a>
                <a
                  href="https://x.com/FryNetworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white hover:bg-red-50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-gray-300 hover:border-red-500"
                >
                  <img className="w-5 h-5" src={twitter} alt="Twitter" />
                </a>
              </div>
            </div>

            {/* Marketplace Links */}
            <div className="col-span-1">
              <h3 className="text-white font-bold font-Roboto text-lg mb-6 uppercase tracking-wide border-b-2 border-red-600 pb-2 inline-block">
                Marketplace
              </h3>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => navigate('/explore-listed-nfts')}
                    className="text-gray-300 hover:text-red-400 font-normal font-Roboto transition-all duration-300 hover:translate-x-2 transform hover:font-medium text-base flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors duration-300"></span>
                    Listed NFTs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/auction', { state: { collectionData: collectionData } })}
                    className="text-gray-300 hover:text-red-400 font-normal font-Roboto transition-all duration-300 hover:translate-x-2 transform hover:font-medium text-base flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors duration-300"></span>
                    Live Auctions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/trending-nft')}
                    className="text-gray-300 hover:text-red-400 font-normal font-Roboto transition-all duration-300 hover:translate-x-2 transform hover:font-medium text-base flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors duration-300"></span>
                    Trending NFTs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/nft-collection', { state: { collectionDataFull: collectionDataFull } })}
                    className="text-gray-300 hover:text-red-400 font-normal font-Roboto transition-all duration-300 hover:translate-x-2 transform hover:font-medium text-base flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors duration-300"></span>
                    Collections
                  </button>
                </li>
              </ul>
            </div>

            {/* Community Links */}
            <div className="col-span-1">
              <h3 className="text-white font-bold font-Roboto text-lg mb-6 uppercase tracking-wide border-b-2 border-red-600 pb-2 inline-block">
                Community
              </h3>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => navigate('/top-seller')}
                    className="text-gray-300 hover:text-red-400 font-normal font-Roboto transition-all duration-300 hover:translate-x-2 transform hover:font-medium text-base flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors duration-300"></span>
                    Top Sellers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/top-collection')}
                    className="text-gray-300 hover:text-red-400 font-normal font-Roboto transition-all duration-300 hover:translate-x-2 transform hover:font-medium text-base flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors duration-300"></span>
                    Top Collections
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={() => navigate('/top-seller')}
                    className="text-gray-300 hover:text-red-400 font-normal font-Roboto transition-all duration-300 hover:translate-x-2 transform hover:font-medium text-base flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors duration-300"></span>
                    Artist Profiles
                  </button>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-600 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 font-normal font-Roboto text-sm">
                © 2025 <span className="text-red-400 font-medium">Fry Market</span>. All rights reserved.
              </p>
              <div className="flex items-center gap-8 text-sm">
                <button className="text-gray-400 hover:text-red-400 font-normal font-Roboto transition-colors duration-300 hover:underline">
                  Privacy Policy
                </button>
                <button className="text-gray-400 hover:text-red-400 font-normal font-Roboto transition-colors duration-300 hover:underline">
                  Terms of Service
                </button>
                <button className="text-gray-400 hover:text-red-400 font-normal font-Roboto transition-colors duration-300 hover:underline">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
