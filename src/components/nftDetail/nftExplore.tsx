import { Pagination, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import bannerGrid from '../../assets/auction/auctionGrid.png'
import auctionTopGrid from '../../assets/auction/auctionTopGrid.webp'
import bannerImg1 from '../../assets/auction/bannerImg1.webp'
import bannerImg2 from '../../assets/auction/bannerImg2.png'
import bannerImg3 from '../../assets/auction/bannerImg3.png'
import bannerImg4 from '../../assets/auction/bannerImg4.png'
import { getAllListed } from '../../fryMarketMethods'
import CollectionsCard from '../cards/collectionsCard'
import Input from '../shared/input'

const ExploreListedNfts = () => {
  const location = useLocation()
  const { listedNfts } = (location.state || {}) as any // Get the listed NFTs passed via state if available

  // Pagination and search state
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(12) // 12 items per page (3 rows of 4)
  const [sortBy, setSortBy] = useState('name') // Default sort
  const [priceRange, setPriceRange] = useState('all')

  // Use a local copy so we can fetch if location state wasn't provided
  const [localListedNfts, setLocalListedNfts] = useState<any[]>(Array.isArray(listedNfts) ? listedNfts : [])

  // Filter and sort NFTs based on criteria
  const getFilteredAndSortedNfts = () => {
    const base = Array.isArray(localListedNfts) ? localListedNfts : []

    const filtered = base.filter((nft: any) => {
      if (!nft || !nft.isListed) return false

      // normalize searchable strings (support several possible shapes)
      const name = (nft.name || nft.nftName || nft.params?.name || '').toString().toLowerCase()
      const description = (nft.description || nft.params?.description || '').toString().toLowerCase()
      const seller = (nft.seller || nft.params?.creator || '').toString().toLowerCase()
      const q = searchTerm.toLowerCase()

      if (!q) return true
      return name.includes(q) || description.includes(q) || seller.includes(q)
    })

    // Price filtering
    if (priceRange !== 'all') {
      filtered = filtered.filter((nft: any) => {
        const price = parseFloat(nft.price || nft.params?.price || '0') / 1000000 // Convert from micro units
        switch (priceRange) {
          case 'low':
            return price < 10
          case 'medium':
            return price >= 10 && price <= 100
          case 'high':
            return price > 100
          default:
            return true
        }
      })
    }

    // Sorting
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'name':
          return (a.nftName || '').localeCompare(b.nftName || '')
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price)
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price)
        case 'newest':
          return new Date(b.listTime).getTime() - new Date(a.listTime).getTime()
        default:
          return 0
      }
    })

    return filtered
  }

  const filteredNfts = getFilteredAndSortedNfts()

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedNfts = filteredNfts.slice(startIndex, endIndex)

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSortBy('name')
    setPriceRange('all')
    setCurrentPage(1)
  }

  // If the user navigated directly to the page (no state), fetch listings
  useEffect(() => {
    const loadIfNeeded = async () => {
      if (!Array.isArray(listedNfts) || listedNfts.length === 0) {
        try {
          const resp = await getAllListed()
          setLocalListedNfts(resp || [])
        } catch (e) {
          setLocalListedNfts([])
        }
      } else {
        setLocalListedNfts(listedNfts)
      }
    }
    loadIfNeeded()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Scroll to the top when this component is mounted
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="exploreWrapper ">
      <div className="container">
        <div className="auctionBannerWrapper my-20 sm:my-40 relative pb-7">
          <img className="bannergrid absolute right-[0px] bottom-[-300px] -z-10 hidden sm:block" src={bannerGrid} alt="" />
          <img className="bannergrid absolute left-[0px] top-[-100px] -z-10 hidden sm:block" src={auctionTopGrid} alt="" />

          <div className="container">
            <div className="bannerInner flex flex-col items-center justify-start gap-4 sm:gap-6">
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[150px] primary font-bold font-Apex text-center tracking-wider lg:tracking-[6px]">
                LISTING
              </h1>
              <div className="nftDiv flex flex-wrap sm:flex-nowrap items-end justify-center gap-2 sm:gap-4 px-4 sm:px-0">
                <img
                  className="max-w-[120px] sm:max-w-[200px] lg:max-w-[273px] max-h-[120px] sm:max-h-[200px] lg:max-h-[273px] w-full h-full object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl border-solid border-4 sm:border-6 lg:border-[10px] border-[#fff] shadow-[2px_2px_8px_0px_rgba(0,0,0,0.15)] sm:shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]"
                  src={bannerImg1}
                  alt=""
                />
                <img
                  className="max-w-[120px] sm:max-w-[200px] lg:max-w-[273px] max-h-[80px] sm:max-h-[120px] lg:max-h-[162px] w-full h-full object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl border-solid border-4 sm:border-6 lg:border-[10px] border-[#fff] shadow-[2px_2px_8px_0px_rgba(0,0,0,0.15)] sm:shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]"
                  src={bannerImg2}
                  alt=""
                />
                <img
                  className="max-w-[120px] sm:max-w-[200px] lg:max-w-[273px] max-h-[80px] sm:max-h-[120px] lg:max-h-[162px] w-full h-full object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl border-solid border-4 sm:border-6 lg:border-[10px] border-[#fff] shadow-[2px_2px_8px_0px_rgba(0,0,0,0.15)] sm:shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]"
                  src={bannerImg3}
                  alt=""
                />
                <img
                  className="max-w-[120px] sm:max-w-[200px] lg:max-w-[273px] max-h-[120px] sm:max-h-[200px] lg:max-h-[273px] w-full h-full object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl border-solid border-4 sm:border-6 lg:border-[10px] border-[#fff] shadow-[2px_2px_8px_0px_rgba(0,0,0,0.15)] sm:shadow-[4px_4px_15px_0px_rgba(0,0,0,0.20)]"
                  src={bannerImg4}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Controls */}
        <div className="searchAndFiltersWrapper mb-12">
          {/* Search Bar */}
          <div className="searchSection mb-8">
            <div className="flex flex-col items-center">
              <h3 className="font-Apex font-normal darkBlack mb-6 text-center uppercase tracking-wider text-lg md:text-xl lg:text-2xl">
                DISCOVER NFTS
              </h3>
              <div className="searchBox relative w-full max-w-[600px] px-4 sm:px-0">
                <Input
                  type="text"
                  placeholder="Search NFTs by name, description, or seller..."
                  value={searchTerm}
                  onChange={handleSearch}
                  inputClass="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg font-Roboto border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-primary focus:outline-none transition-all duration-300"
                  wrapperClass="w-full"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-lightGray hover:text-primary transition-colors duration-200 text-lg sm:text-xl"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="filtersSection bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              {/* Filter Controls Row */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Sort By */}
                <div className="filterGroup flex-1 min-w-0">
                  <label className="font-Roboto font-medium darkBlack mb-2 block text-xs sm:text-sm">Sort By</label>
                  <Select value={sortBy} onChange={setSortBy} style={{ width: '100%', height: 40 }} className="custom-select w-full">
                    <Select.Option value="name">Name (A-Z)</Select.Option>
                    <Select.Option value="price-low">Price (Low to High)</Select.Option>
                    <Select.Option value="price-high">Price (High to Low)</Select.Option>
                    <Select.Option value="newest">Recently Listed</Select.Option>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="filterGroup flex-1 min-w-0">
                  <label className="font-Roboto font-medium darkBlack mb-2 block text-xs sm:text-sm">Price Range</label>
                  <Select
                    value={priceRange}
                    onChange={setPriceRange}
                    style={{ width: '100%', height: 40 }}
                    className="custom-select w-full"
                  >
                    <Select.Option value="all">All Prices</Select.Option>
                    <Select.Option value="low">Under 10 FRY</Select.Option>
                    <Select.Option value="medium">10 - 100 FRY</Select.Option>
                    <Select.Option value="high">100+ FRY</Select.Option>
                  </Select>
                </div>
              </div>

              {/* Results Info */}
              <div className="resultsInfo mt-4 lg:mt-0 lg:ml-6">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center lg:text-left min-w-fit">
                  <p className="font-Roboto font-bold darkBlack text-lg sm:text-xl">{filteredNfts.length}</p>
                  <p className="font-Roboto lightGray text-xs sm:text-sm">
                    NFT{filteredNfts.length !== 1 ? 's' : ''} found
                    {searchTerm && <span className="block">for "{searchTerm}"</span>}
                  </p>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="filterGroup">
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 font-Roboto font-medium primary bg-white border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 small"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="nftWrapper mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-x-10 xl:gap-y-9 px-4 sm:px-0">
          {paginatedNfts.length > 0 ? (
            paginatedNfts.map((data: any, index: any) => (
              <CollectionsCard
                key={data.assetId}
                data={data}
                label={'Buy'}
                collectionData={data.seller} // You may want to adjust this for the collection data
              />
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-12 sm:py-20">
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-12 shadow-lg border border-gray-100 max-w-sm sm:max-w-md mx-auto">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="font-Apex font-normal darkBlack mb-4 text-sm sm:text-base">
                  {searchTerm ? 'NO MATCHES FOUND' : 'NO NFTS AVAILABLE'}
                </h3>
                <p className="font-Roboto lightGray text-xs sm:text-sm">
                  {searchTerm
                    ? `No NFTs found matching "${searchTerm}". Try adjusting your search or filters.`
                    : 'No NFTs are currently listed for sale.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 font-Roboto font-medium bg-primary text-white rounded-lg sm:rounded-xl hover:bg-red-600 transition-all duration-300 text-sm sm:text-base"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {filteredNfts.length > pageSize && (
          <div className="paginationWrapper mt-8 sm:mt-16 flex flex-col items-center px-4 sm:px-0">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 w-full max-w-md sm:max-w-none">
              <Pagination
                current={currentPage}
                total={filteredNfts.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper={false}
                className="custom-pagination"
                responsive={true}
                showTotal={(total, range) => (
                  <div className="font-Roboto lightGray text-xs sm:text-sm text-center mb-4">
                    Showing {range[0]}-{range[1]} of {total} NFTs
                  </div>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExploreListedNfts
