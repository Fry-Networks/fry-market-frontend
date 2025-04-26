import algosdk from 'algosdk'
import axios from 'axios'

export function formatURL(url: any) {
  // Check if the URL already starts with "https://"
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`
  }

  // Ensure the URL has "www." after the protocol
  if (!/^https?:\/\/www\./i.test(url)) {
    url = url.replace(/^https?:\/\//i, 'https://www.')
  }

  // Return the properly formatted URL
  return url.toLowerCase() // Optional: to ensure consistency
}

/**
 * Get the collection data by Asset ID
 * @param nftId
 * @returns collection_data
 */
export async function getCollectionByNftId(nftId: number) {
  try {
    const indexerClient = new algosdk.Indexer(
      'v2', // API version
      import.meta.env.VITE_INDEXER_SERVER, // URL for the indexer (you can change to mainnet or another network)
      '', // Optional: if using a token, provide it here
    )
    // Query the first AssetConfig transaction by assetID
    const assetID = nftId
    const txns = await indexerClient.searchForTransactions().assetID(assetID).do()
    if (txns && txns?.transactions?.length > 0) {
      const groupId = txns?.transactions[0]['confirmed-round']
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/collection-details-by-nft/${groupId}`)
      return result.data
    } else {
      return null
    }
    // console.log('txns', txns)
  } catch (e) {
    // console.log('error', e)
    return null
  }
}
/**
 * Function to get collection data by collection address
 * @param collectionAddress
 * @returns collection data
 */
export async function getCollectionDataByAddress(collectionAddress: string) {
  try {
    const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/get-collection/${collectionAddress}`)
    // console.log('result', result.data)
    return result.data
  } catch (e) {
    // console.log('error', e)
    return null
  }
}
