// Compiled AVM bytecode for FryAuctionBidding contract (Phase 6)
// Extracted from FryAuctionBidding.arc56.json byteCode field
// Used by list_nft_on_auction to create bidding app via inner txn (factory pattern)
// REVERSAL: Remove-Item src\contracts\FryAuctionBiddingTeal.ts

function b64ToUint8Array(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

const APPROVAL_B64 = 'CyADAAEIJggNdG90YWxfYmlkZGVycwFiC2hpZ2hlc3RfYmlkDmhpZ2hlc3RfYmlkZGVyEGJpZF9zdGFydF9hbW91bnQObWluX2JpZF9hbW91bnQSYmlkZGluZ19zdGFydF90aW1lEGJpZGRpbmdfZW5kX3RpbWUxGRREMRhBABaCAgTbf+hDBJQldYg2GgCOAgB8AOIAgARxZsmxNhoAjgEAAQA2GgFJFSQSRBc2GgJJFYEgEkQ2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBc2GgZJFSQSRBeACGFzc2V0X2lkTwZngAZzZWxsZXJPBWcnBE8EZycFTwNnJwZPAmcnB0xnKiJnKzIDZygiZyNDMRYjCUk4ECMSRDIHIicGZUQPRDIHIicHZUQOREk4CElOAiInBGVESwEORCIqZUQiJwVlRAgPRDgHMgoSRCkxAFC9RQFAAAkiKGVEIwgoTGdHAhYyBxZQKTEAUEy/KkxnKzEAZyNDKTEAUL1FAUQpMQBQvkQxACIrZUQTRCJbKTEAULxIIihlRCMJKExnsTEAsgeyCCOyECKyAbMjQw==';

const CLEAR_B64 = 'C4EBQw==';

export const BIDDING_APPROVAL_PROGRAM: Uint8Array = b64ToUint8Array(APPROVAL_B64);
export const BIDDING_CLEAR_PROGRAM: Uint8Array = b64ToUint8Array(CLEAR_B64);
