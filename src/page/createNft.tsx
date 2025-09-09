import { Icon } from '@iconify/react'
import { useWallet } from '@txnlab/use-wallet'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import bgGlow from '../assets/images/createNft/bgGlow.webp'
import Button from '../components/shared/button'
import { mintMultipleNft } from '../fryMarketMethods'
import './loader.scss'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const getGenerationKey = (params: any) => {
  if (!params || !params.inputValue || !params.selectedStyle || !params.supply) return null
  return `genKey-prompt:${params.inputValue}-style:${params.selectedStyle}-supply:${params.supply}`
}

const CreateNft: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<any[]>([])
  const [generatedNfts, setGeneratedNfts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [mintLoading, setMintLoading] = useState(false)
  const [locationParams, setLocationParams] = useState<any>(null)
  const [currentExpectedSupply, setCurrentExpectedSupply] = useState<number>(0)
  const [isFailed, setIsFailed] = useState<boolean>(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { activeAccount, signer, signTransactions, sendTransactions } = useWallet()
  const walletAddressRef = useRef<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (activeAccount?.address) {
      walletAddressRef.current = activeAccount.address
    }
  }, [activeAccount])

  useEffect(() => {
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        console.log('CreateNft unmounting, closing WebSocket.')
        wsRef.current.onclose = null // Prevent onclose from firing after manual close
        wsRef.current.close(1000, 'Component unmounting') // Normal closure
        wsRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const state = location.state as any
    console.log('Location state on CreateNft load:', state?.selectedCollectionData?.collection_name)
    if (state && state.inputValue && state.selectedStyle && state.supply) {
      setLocationParams(state)
      const generationKey = getGenerationKey(state)

      if (!generationKey) {
        toast.error('Invalid parameters for image generation.')
        navigate('/create-nft-page')
        return
      }

      const incomingSupply = Number(state.supply)
      setCurrentExpectedSupply(incomingSupply)

      const supplyKey = `${generationKey}_expectedSupply`
      localStorage.setItem(supplyKey, incomingSupply.toString())

      const storedNftsData = localStorage.getItem(`${generationKey}_nfts`)
      let existingNfts: any[] = []
      if (storedNftsData) {
        try {
          existingNfts = JSON.parse(storedNftsData)
          console.log(`Loaded ${existingNfts.length} NFTs from localStorage for key ${generationKey}.`)
        } catch (e) {
          console.error(`Failed to parse stored NFTs from localStorage for key ${generationKey}:`, e)
          localStorage.removeItem(`${generationKey}_nfts`)
        }
      } else {
        console.log('No NFTs found in localStorage for key:', generationKey)
      }
      setGeneratedNfts(existingNfts)

      const generationAttempted = localStorage.getItem(`${generationKey}_attempted`) === 'true'
      const numAlreadyGenerated = existingNfts.length

      console.log(
        `Page Load/State Change for key ${generationKey}: Target Supply: ${incomingSupply}, Have: ${numAlreadyGenerated}, Attempted Before: ${generationAttempted}`,
      )

      if (numAlreadyGenerated >= incomingSupply) {
        console.log('All images already generated and loaded for key:', generationKey)
        setLoading(false)
        setIsFailed(false)
        localStorage.setItem(`${generationKey}_attempted`, 'true')
      } else if (generationAttempted || numAlreadyGenerated > 0) {
        // Resume if attempted or if some images are already there
        console.log(`Resuming generation for key: ${generationKey}. Target: ${incomingSupply}, Have: ${numAlreadyGenerated}`)
        _startImageGeneration(state, generationKey, existingNfts, incomingSupply)
      } else {
        console.log(`Starting fresh generation for key: ${generationKey}. Target: ${incomingSupply}`)
        _startImageGeneration(state, generationKey, [], incomingSupply)
      }
    } else {
      console.log('No location.state with generation params found. Navigating to create page.')
      navigate('/create-nft-page')
    }
  }, [location.state, navigate])

  const _startImageGeneration = (params: any, key: string, initialNfts: any[], targetTotalSupply: number) => {
    const numAlreadyHave = initialNfts.length
    const numImagesToRequest = targetTotalSupply - numAlreadyHave

    console.log(
      `_startImageGeneration: Key: ${key}, Target Total: ${targetTotalSupply}, Already Have: ${numAlreadyHave}, Requesting Now: ${numImagesToRequest}`,
    )

    if (numImagesToRequest <= 0) {
      console.log('No new images needed for key:', key)
      setGeneratedNfts(initialNfts)
      setCurrentExpectedSupply(targetTotalSupply)
      setLoading(false) // Ensure loading is false
      setIsFailed(false)
      if (numAlreadyHave >= targetTotalSupply) {
        localStorage.setItem(`${key}_attempted`, 'true')
      }
      return
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log('Closing existing WebSocket before starting new generation.')
      wsRef.current.onclose = null
      wsRef.current.close(1000, 'Starting new generation')
      wsRef.current = null
    }

    setLoading(true)
    setIsFailed(false)
    setGeneratedNfts([...initialNfts])
    setCurrentExpectedSupply(targetTotalSupply)
    setSelectedImages([])
    localStorage.setItem(`${key}_attempted`, 'true')

    const ws = new WebSocket('wss://nftproduction.fry.market/ws')
    wsRef.current = ws
    const currentWalletAddress = walletAddressRef.current || 'fallback_wallet_address_on_start'
    let localGeneratedNftsAccumulator: any[] = [...initialNfts]

    ws.onopen = () => {
      if (wsRef.current !== ws) return // Stale WebSocket
      console.log('WebSocket connected. Requesting', params, numImagesToRequest, 'new images.')

      ws.send(
        JSON.stringify({
          wallet_address: currentWalletAddress,
          prompt: params.inputValue,
          style: params.selectedStyle,
          num_images: numImagesToRequest,
          collection_name: params.selectedCollectionData?.collection_name || 'Unnamed Collection'
        }),
      )
    }

    ws.onmessage = (event) => {
      if (wsRef.current !== ws) {
        console.log('Received message from an old WebSocket instance, ignoring.')
        return
      }
      const data = JSON.parse(event.data as string)

      if (data.type === 'image') {
        const newNftData = { image: data.data, id: `nft-${Date.now()}-${Math.random()}` }
        localGeneratedNftsAccumulator.push(newNftData)
        setGeneratedNfts((prevNfts) => [...prevNfts, newNftData])
        localStorage.setItem(`${key}_nfts`, JSON.stringify(localGeneratedNftsAccumulator))
        console.log(`Received image. Total in accumulator: ${localGeneratedNftsAccumulator.length}. Saved to localStorage.`)

        // Check if we have all images and metadata
        const completeNfts = localGeneratedNftsAccumulator.filter((nft) => nft.name && nft.description)
        if (completeNfts.length >= targetTotalSupply) {
          console.log(`All ${targetTotalSupply} NFTs complete (have images + metadata). Setting loading to false.`)
          setLoading(false)
          setIsFailed(false)
          if (wsRef.current === ws) {
            ws.close(1000, 'Generation complete - all NFTs received')
            wsRef.current = null
          }
        }
      } else if (data.type === 'metadata') {
        const metadata = data.data
        localGeneratedNftsAccumulator = localGeneratedNftsAccumulator.map((nft) =>
          nft.image === metadata.image ? { ...nft, ...metadata } : nft,
        )
        setGeneratedNfts([...localGeneratedNftsAccumulator])
        localStorage.setItem(`${key}_nfts`, JSON.stringify(localGeneratedNftsAccumulator))
        console.log(`Received metadata. Total in accumulator: ${localGeneratedNftsAccumulator.length}. Saved to localStorage.`)

        // Check if we have all images and metadata
        const completeNfts = localGeneratedNftsAccumulator.filter((nft) => nft.name && nft.description)
        if (completeNfts.length >= targetTotalSupply) {
          console.log(`All ${targetTotalSupply} NFTs complete (have images + metadata). Setting loading to false.`)
          setLoading(false)
          setIsFailed(false)
          if (wsRef.current === ws) {
            ws.close(1000, 'Generation complete - all NFTs received')
            wsRef.current = null
          }
        }
      } else if (data.type === 'event' && data.message === 'All images and metadata sent') {
        console.log(
          `WebSocket event: All requested images and metadata sent for key: ${key}. Accumulator size: ${localGeneratedNftsAccumulator.length}`,
        )
        localStorage.setItem(`${key}_nfts`, JSON.stringify(localGeneratedNftsAccumulator))
        console.log(`Final save: ${localGeneratedNftsAccumulator.length} NFTs to localStorage for key ${key}.`)

        // IMPORTANT: Set loading to false here
        setLoading(false)

        if (localGeneratedNftsAccumulator.length < targetTotalSupply) {
          setIsFailed(true)
          if (!toast.isActive('generation-incomplete')) {
            toast.warn(
              `Generation complete, but some images might be missing. Expected ${targetTotalSupply}, got ${localGeneratedNftsAccumulator.length}.`,
              { toastId: 'generation-incomplete' },
            )
          }
        } else {
          setIsFailed(false)
        }
        if (wsRef.current === ws) {
          ws.close(1000, 'Generation complete')
          wsRef.current = null
        }
      } else if (data.error) {
        console.error('Error from WebSocket:', data.error)
        toast.error(`Error generating NFTs: ${data.error}`)
        setIsFailed(true)
        setLoading(false) // Ensure loading is false on error
        if (wsRef.current === ws) {
          ws.close(1006, 'Error received')
          wsRef.current = null
        }
      }
    }

    ws.onerror = (error) => {
      if (wsRef.current !== ws) return
      console.error('WebSocket error:', error)
      toast.error('WebSocket connection error during NFT generation.')
      setIsFailed(true)
      setLoading(false)
      if (wsRef.current === ws) {
        wsRef.current = null
      } // WS is likely already closed or unusable
    }
    ws.onclose = (event) => {
      if (wsRef.current !== ws && wsRef.current !== null) {
        console.log('Close event from an old/different WebSocket instance, ignoring.')
        return
      }
      console.log('WebSocket closed:', event.reason, event.code, 'Target WS was:', ws)

      // IMPORTANT: Always set loading to false when WebSocket closes
      setLoading(false)

      if (localGeneratedNftsAccumulator.length < targetTotalSupply) {
        setIsFailed(true)
        if (!toast.isActive('generation-interrupted')) {
          toast.info('Image generation was interrupted.', { toastId: 'generation-interrupted' })
        }
      }
      if (wsRef.current === ws) {
        wsRef.current = null
      }
    }
  }

  const handleGenerateAgain = () => {
    if (locationParams) {
      const generationKey = getGenerationKey(locationParams)
      const targetSupplyForRegen = Number(localStorage.getItem(`${generationKey}_expectedSupply`)) || Number(locationParams.supply) || 0

      if (generationKey && targetSupplyForRegen > 0) {
        console.log('Generate Again clicked for key:', generationKey, 'Target Supply:', targetSupplyForRegen)
        localStorage.removeItem(`${generationKey}_nfts`)
        localStorage.removeItem(`${generationKey}_attempted`)
        _startImageGeneration(locationParams, generationKey, [], targetSupplyForRegen)
      } else {
        toast.error('Cannot generate again: parameters or target supply are invalid.')
      }
    } else {
      toast.error('Cannot generate again: no parameters loaded.')
    }
  }

  const handleClick = async () => {
    if (selectedImages.length === 0) {
      toast.error(`Please select an NFT${locationParams?.nftType !== 'single' ? 's' : ''} to mint.`)
      return
    }
    if (!activeAccount?.address) {
      toast.error('Please connect wallet first.')
      return
    }
    toast.promise(mintNft(), {
      pending: 'NFT is minting. Please wait.',
      error: 'There was an error minting NFT.',
      success: `NFT(s) minted successfully.`,
    })
  }

  const mintNft = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        setMintLoading(true)
        // ... (rest of mintNft logic remains the same)
        const batchSize = 16
        const totalBatches = Math.ceil(selectedImages.length / batchSize)
        const imageBatches = Array.from({ length: totalBatches }, (_, i) => selectedImages.slice(i * batchSize, (i + 1) * batchSize))
        let successOccurred = false

        for (let i = 0; i < totalBatches; i++) {
          const batch = imageBatches[i]
          try {
            const response: any = await mintMultipleNft(
              batch,
              activeAccount?.address || '',
              signer,
              signTransactions,
              sendTransactions,
              locationParams?.selectedCollection,
            )
            if (response) {
              if (locationParams?.selectedCollection && response['confirmed-round']) {
                console.warn('Collection update logic needs verification: add_nfts should use Asset IDs, not confirmed-round.')
              }
              if (totalBatches > 1) toast.success(`Batch ${i + 1} minting successful`)
              successOccurred = true
            }
          } catch (batchError) {
            console.error(`Error minting Batch ${i + 1}`, batchError)
            toast.error(`Error minting Batch ${i + 1}: ${(batchError as Error).message || 'Unknown error'}`)
          }
        }

        if (successOccurred) {
          setMintLoading(false)
          resolve(true)
          navigate('/artist-profile')
        } else {
          setMintLoading(false)
          toast.error('Minting failed for all batches.')
          reject(false)
        }
      } catch (e) {
        console.error('Error Minting NFT', e)
        toast.error(`Error minting NFTs: ${(e as Error).message || 'Unknown error'}`)
        setMintLoading(false)
        reject(false)
      }
    })
  }

  // ...existing code...

  // ...existing code...

  const toggleImageSelection = (nftObject: any) => {
    console.log('Toggling selection for NFT:', nftObject)
    console.log('loading:', loading, 'mintLoading:', mintLoading)
    console.log('Current selectedImages:', selectedImages)

    if (loading || mintLoading) {
      console.log('Blocked: loading or mintLoading is true')
      return
    }

    if (!nftObject || !nftObject.image) {
      console.warn('Invalid NFT object or missing image property:', nftObject)
      return
    }

    if (locationParams?.nftType === 'single') {
      // Check if this NFT is already selected
      const isAlreadySelected = selectedImages.some(
        (selectedNft: any) => (selectedNft.id && selectedNft.id === nftObject.id) || selectedNft.image === nftObject.image,
      )

      if (isAlreadySelected) {
        console.log('Single NFT mode: NFT already selected, deselecting:', nftObject)
        setSelectedImages([]) // Deselect by setting empty array
      } else {
        console.log('Single NFT mode: Selecting NFT:', nftObject)
        setSelectedImages([nftObject]) // Select this NFT
      }
    } else {
      console.log('Multiple NFT mode, toggling selection for:', nftObject)

      // Use a more reliable comparison method
      const foundIndex = selectedImages.findIndex((selectedNft: any) => {
        // Try to match by id first, then by image URL as fallback
        if (selectedNft.id && nftObject.id) {
          return selectedNft.id === nftObject.id
        }
        // Fallback to image URL comparison
        return selectedNft.image === nftObject.image
      })

      console.log('Found index in selectedImages:', foundIndex)

      if (foundIndex > -1) {
        console.log('NFT already selected, removing from selection:', nftObject)
        // Remove if already selected - use filter instead of splice
        setSelectedImages((prev) => {
          const newSelected = prev.filter((_, idx) => idx !== foundIndex)
          console.log('New selectedImages after removal:', newSelected)
          return newSelected
        })
      } else {
        console.log('NFT not selected, adding to selection:', nftObject)
        // Add if not selected
        setSelectedImages((prev) => {
          const newSelected = [...prev, nftObject]
          console.log('New selectedImages after addition:', newSelected)
          return newSelected
        })
      }
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (loading || mintLoading) {
        event.preventDefault()
        event.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [loading, mintLoading])

  return (
    <>
      <div className="createNft mt-16 relative">
        <img className="absolute top-[-200px] -z-10" src={bgGlow} alt="" />
        <div className="container">
          <div className="nftBtnContainer flex items-center justify-between mb-[75px]">
            <div className="leftSection flex items-center gap-8">
              <div className="singlenft flex items-center justify-between gap-4">
                <Button
                  text={`${locationParams?.nftType === 'single' ? 'Single NFT' : 'Multiple NFT'}`}
                  className="py-4 px-8 lightGray font-normal font-Roboto border cursor-default"
                />
                <p className="large lightGray font-normal font-Roboto">
                  {generatedNfts.length} / {currentExpectedSupply || locationParams?.supply || 0} Generated
                </p>
              </div>
              <div className="collectionInfo">
                <p className="lightGray font-normal font-Roboto text-base">
                  Collection: {locationParams?.selectedCollection ? 'Selected' : 'None'}
                </p>
              </div>
            </div>
            <div className="selectnft flex justify-center items-center gap-3">
              <p className="lightGray font-normal font-Roboto text-base">
                {selectedImages.length > 0
                  ? `${selectedImages.length} NFT${selectedImages.length > 1 ? 's' : ''} selected`
                  : 'Select NFT(s) to mint'}
              </p>
              {generatedNfts.length > 0 && (
                <Button
                  className="button btn-secondary text-[12px] font-semibold"
                  width={100}
                  minHeight={37}
                  text={selectedImages.length === generatedNfts.length ? 'Deselect All' : 'Select All'}
                  onClick={() => {
                    if (selectedImages.length === generatedNfts.length) {
                      setSelectedImages([])
                    } else {
                      setSelectedImages([...generatedNfts])
                    }
                  }}
                  disabled={loading || mintLoading}
                />
              )}
              <Button
                className="button btn-primary text-[12px] font-semibold"
                width={96}
                minHeight={37}
                text="Mint NFT"
                onClick={handleClick}
                disabled={loading || mintLoading || generatedNfts.length === 0 || generatedNfts.length < currentExpectedSupply}
              />
              {!loading && isFailed && currentExpectedSupply > 0 && generatedNfts.length < currentExpectedSupply && (
                <Button
                  className="button btn-primary text-[12px] font-semibold"
                  width={120}
                  minHeight={37}
                  text="Generate Again"
                  onClick={handleGenerateAgain}
                  disabled={mintLoading}
                />
              )}
            </div>
          </div>
          <div className="singleNftCard flex items-center justify-start flex-wrap gap-[50px]">
            {generatedNfts.map((nftObject: any, index: any) => (
              <div
                key={nftObject.id || nftObject.image || `gen-nft-${index}`}
                className="relative group overflow-hidden cursor-pointer w-[288px] h-[265px]"
                onClick={() => toggleImageSelection(nftObject)}
              >
                <img
                  src={nftObject.image}
                  alt={`nft-${index}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 rounded-2xl ${selectedImages.some(
                    (selectedNft: any) => (selectedNft.id && selectedNft.id === nftObject.id) || selectedNft.image === nftObject.image,
                  )
                    ? 'opacity-70'
                    : 'opacity-100'
                    }`}
                />
                {selectedImages.some(
                  (selectedNft: any) => (selectedNft.id && selectedNft.id === nftObject.id) || selectedNft.image === nftObject.image,
                ) && (
                    <>
                      <div className="absolute rounded-2xl inset-0 bg-black opacity-60"></div>
                      <div className="absolute top-3 right-3 w-6 h-6 bg-transparent flex items-center justify-center">
                        <Icon icon="teenyicons:tick-circle-solid" width="24" height="24" style={{ color: 'white' }} />
                      </div>
                    </>
                  )}
              </div>
            ))}
            {loading &&
              Array.from({
                length: Math.max(0, (currentExpectedSupply || Number(locationParams?.supply || 0)) - generatedNfts.length),
              }).map((_, index) => (
                <div
                  key={`loader-${index}`}
                  className="relative group overflow-hidden w-[288px] h-[265px] flex items-center justify-center rounded-2xl bg-[#f0f0f0]"
                >
                  <span className="loaderNew"></span>
                </div>
              ))}
            {!loading && generatedNfts.length === 0 && (currentExpectedSupply > 0 || Number(locationParams?.supply || 0) > 0) && (
              <div className="w-full text-center py-10">
                <p className="text-gray-500">
                  {isFailed ? "Image generation failed. Try 'Generate Again'." : 'No images generated yet. Generation might start shortly.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNft
