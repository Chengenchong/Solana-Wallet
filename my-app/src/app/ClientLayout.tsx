"use client"; // This component is client-side only

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider } from './WalletContext'; // Adjust the path
import './globals.css';

const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect={true}>
        <WalletProvider>{children}</WalletProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
