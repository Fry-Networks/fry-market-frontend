import { useMemo } from 'react';
import { useWallet } from '@txnlab/use-wallet';
import { TransactionSigner } from 'algosdk';
import { useChain } from '../contexts/ChainContext';
import { useVoiWallet } from '../contexts/VoiWalletContext';
import { ChainId } from '../config/chains';

interface MultiChainWalletValue {
  activeAddress: string | null | undefined;
  isConnected: boolean;
  signTransactions: ((txns: Uint8Array[]) => Promise<Uint8Array[]>) | undefined;
  signer: TransactionSigner | undefined;
  chainId: ChainId;
  algorandProviders: ReturnType<typeof useWallet>['providers'];
  isKibisisAvailable: boolean;
  connectVoi: () => Promise<void>;
  connectLute: () => Promise<void>;
  disconnectVoi: () => void;
}

/**
 * Unified wallet hook that switches between Algorand (use-wallet v2) and Voi (Kibisis/Lute)
 * based on the active chain. Use this in shared UI components (navbar, ConnectWallet).
 */
export function useMultiChainWallet(): MultiChainWalletValue {
  const { chainId } = useChain();
  const algorandWallet = useWallet();
  const voiWallet = useVoiWallet();

  const isAlgorand = chainId === 'algorand-mainnet';

  return useMemo(() => ({
    activeAddress: isAlgorand ? algorandWallet.activeAddress : voiWallet.address,
    isConnected: isAlgorand ? !!algorandWallet.activeAddress : voiWallet.isConnected,
    signTransactions: isAlgorand ? algorandWallet.signTransactions : voiWallet.signTransactions,
    signer: isAlgorand ? algorandWallet.signer : voiWallet.signer,
    chainId,
    algorandProviders: algorandWallet.providers,
    isKibisisAvailable: voiWallet.isKibisisAvailable,
    connectVoi: voiWallet.connect,
    connectLute: voiWallet.connectLute,
    disconnectVoi: voiWallet.disconnect,
  }), [
    isAlgorand, chainId,
    algorandWallet.activeAddress, algorandWallet.signTransactions, algorandWallet.signer, algorandWallet.providers,
    voiWallet.address, voiWallet.isConnected, voiWallet.signTransactions, voiWallet.signer,
    voiWallet.isKibisisAvailable, voiWallet.connect, voiWallet.connectLute, voiWallet.disconnect,
  ]);
}
