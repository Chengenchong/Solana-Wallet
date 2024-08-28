"use client"; // Ensure this page is treated as a client-side component

import { Sidebar } from "./Sidebar"; // Adjust path as necessary
import React, { useMemo, useEffect, useState, FC } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { 
  WalletModalProvider,
  WalletMultiButton,
 } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import '@solana/wallet-adapter-react-ui/styles.css';

import { useCallback } from "react";

export const Wallet: FC = () => {
  const endpoint = useMemo(
    () => clusterApiUrl(WalletAdapterNetwork.Devnet),
    []
  );

  const wallets = useMemo(() => [
    new PhantomWalletAdapter(), 
    new SolflareWalletAdapter()
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <WalletMultiButton />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const WalletDisplay: FC = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  // const [buttonState, setButtonState] = useState<string>('no-wallet');
  // const handleClick = useCallback(() => {
  //   switch (buttonState) {
  //       case 'connected':
  //           return onDisconnect;
  //       case 'connecting':
  //       case 'disconnecting':
  //           break;
  //       case 'has-wallet':
  //           return onConnect;
  //       case 'no-wallet':
  //           return onSelectWallet;
  //           break;
  //   }
  // }, [buttonState, onDisconnect, onConnect, onSelectWallet]);

  useEffect(() => {
    console.log("publicKey:", publicKey); // Debugging publicKey value
    if (publicKey) {
      connection.getBalance(publicKey).then((balance) => {
        console.log("Balance fetched:", balance);
        setBalance(balance / LAMPORTS_PER_SOL);
      }).catch((error) => {
        console.error("Error fetching balance:", error);
      });
    }
  }, [publicKey, connection]);

  return (
    <div>
      {publicKey ? (
        <div>
          <p>Wallet Address: {publicKey.toBase58()}</p>
          <p>Balance: {balance !== null ? `${balance} SOL` : "Loading..."}</p>
        </div>
      ) : (
        <p>No wallet connected</p>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.45s" }}>
        <h1>Home</h1>
        <Wallet />
        <WalletDisplay />
      </main>
    </div>
  );
}