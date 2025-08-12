import { Pagination, Tabs } from 'antd'
import React, { useState } from 'react'
import exploreGrid from '../../assets/nftCollection/exploreGrid.webp'
import leftGlow from '../../assets/nftCollection/redGloww.webp'
import rightGlow from '../../assets/nftCollection/rightGlow.webp'
import ExploreCard from '../cards/exploreCard'

const Explore = ({ collectionDataFull }: any) => {
  const [activeKey, setActiveKey] = React.useState('1')

  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9); // 9 items per page (3 rows of 3)

  const onChange = (key: any) => {
    setActiveKey(key)
    setCurrentPage(1); // Reset to first page when changing tabs
  }

  // Filter collections based on search term
  const filteredCollections = Array.isArray(collectionDataFull)
    ? collectionDataFull.filter((collection: any) =>
      collection.collection_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.creator_address?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCollections = filteredCollections.slice(startIndex, endIndex);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="exploreWrapper mt-10 mb-52 relative">
        <img src={rightGlow} className="absolute right-0 top-[-100px]" alt="" />
        <img src={leftGlow} className="absolute bottom-[-500px] left-0" alt="" />
        <img src={exploreGrid} className=" exploreGrid absolute bottom-[-500px] right-0" alt="" />
        <div className="container">
          <h2 className="font-normal font-Apex uppercase mb-10">EXPLORE COLLECTIONS</h2>

          {/* Enhanced Search and Filter Controls */}
          <div className="searchAndFilters mb-8 sm:mb-12 px-4 sm:px-0">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between">
                {/* Search Input */}
                <div className="flex-1 w-full lg:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search collections by name, description, or creator..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-8 sm:pr-4 py-3 sm:py-4 font-Roboto border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
                    />
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400 sm:w-5 sm:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    {searchTerm && (
                      <button
                        onClick={() => handleSearch('')}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400 sm:w-4 sm:h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Results Info */}
                <div className="text-center lg:text-right mt-4 lg:mt-0">
                  <span className="font-Roboto text-gray-600 font-medium text-sm sm:text-base">
                    {filteredCollections.length} collection{filteredCollections.length !== 1 ? 's' : ''} found
                    {searchTerm && (
                      <span className="block sm:inline"> for "{searchTerm}"</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Clear Search Button */}
              {searchTerm && (
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <button
                    onClick={() => handleSearch('')}
                    className="px-4 sm:px-6 py-2 font-Roboto font-medium text-primary border border-primary rounded-lg sm:rounded-xl hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="tabSection">
            <Tabs className="collectionTab" defaultActiveKey="1" activeKey={activeKey} onChange={onChange} tabBarStyle={{ padding: 0 }}>
              <Tabs.TabPane tab="All" key="1">
                <div className="popularcardContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-5 px-4 sm:px-0">
                  {paginatedCollections.length > 0 ? (
                    paginatedCollections.map((data: any, index: any) => (
                      <ExploreCard data={data} key={data._id} />
                    ))
                  ) : (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12 sm:py-20">
                      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-12 shadow-lg border border-gray-100 max-w-sm sm:max-w-lg mx-auto">
                        <div className="text-4xl sm:text-6xl mb-4">🎨</div>
                        <h3 className="font-Apex font-normal darkBlack mb-4 text-sm sm:text-base">
                          {searchTerm ? 'NO COLLECTIONS FOUND' : 'NO COLLECTIONS AVAILABLE'}
                        </h3>
                        <p className="font-Roboto lightGray text-xs sm:text-sm">
                          {searchTerm
                            ? `No collections found matching "${searchTerm}". Try adjusting your search terms.`
                            : 'No collections are currently available to explore.'}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => handleSearch('')}
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
                {filteredCollections.length > pageSize && (
                  <div className="paginationWrapper mt-16 flex flex-col items-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <Pagination
                        current={currentPage}
                        total={filteredCollections.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        showQuickJumper={false}
                        className="custom-pagination"
                        showTotal={(total, range) => (
                          <div className="font-Roboto lightGray small text-center mb-4">
                            Showing {range[0]}-{range[1]} of {total} collections
                          </div>
                        )}
                      />
                    </div>
                  </div>
                )}
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
