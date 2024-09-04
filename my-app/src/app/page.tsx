"use client";

import React, { useMemo, useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import '@solana/wallet-adapter-react-ui/styles.css';
import { Sidebar } from "./Sidebar";

export default function Home() {
  const endpoint = useMemo(
    () => clusterApiUrl(WalletAdapterNetwork.Devnet),
    []
  );

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.45s" }}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider>
              <div style={{ padding: "20px" }}>
                <WalletMultiButton />
                <WalletDisplay />
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </main>
    </div>
  );
}

const WalletDisplay = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (publicKey) {
      connection
        .getBalance(publicKey)
        .then((balance) => setBalance(balance / LAMPORTS_PER_SOL))
        .catch((error) => console.error("Error fetching balance:", error));
    } else {
      setBalance(null);
    }
  }, [publicKey, connection]);

  return (
    <div style={{ marginTop: "20px" }}>
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
