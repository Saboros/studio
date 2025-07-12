'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

type VerificationStatus = 'Unverified' | 'Pending' | 'Verified';
type SbtStatus = 'Not Minted' | 'Minted';

interface AppState {
  walletConnected: boolean;
  verificationStatus: VerificationStatus;
  sbtStatus: SbtStatus;
  userAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  setVerificationStatus: (status: VerificationStatus) => void;
  setSbtStatus: (status: SbtStatus) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('Unverified');
  const [sbtStatus, setSbtStatus] = useState<SbtStatus>('Not Minted');
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const connectWallet = useCallback(() => {
    setWalletConnected(true);
    setUserAddress('0x1A2bC3d4e5F6g7H8i9J0kL1mN2oP3qR4sT5uV6w');
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletConnected(false);
    setUserAddress(null);
    setVerificationStatus('Unverified');
    setSbtStatus('Not Minted');
  }, []);

  const value = {
    walletConnected,
    verificationStatus,
    sbtStatus,
    userAddress,
    connectWallet,
    disconnectWallet,
    setVerificationStatus,
    setSbtStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
