"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { PublicKey } from "@solana/web3.js";

interface WalletContextProps {
  publicKey: PublicKey | null;
  setPublicKey: (key: PublicKey | null) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  const value = useMemo(() => ({
    publicKey,
    setPublicKey,
  }), [publicKey]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

