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
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Sidebar } from "./Sidebar";
import { useWalletContext } from "./WalletContext";
import SolToUsdChart from "./exchangeratechart"; // Import the chart component

export default function Home() {
  const endpoint = useMemo(
    () => clusterApiUrl(WalletAdapterNetwork.Devnet),
    []
  );

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.45s" }}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider>
              {/* Parent div with space between to left-align title and right-align button */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
                {/* Left-aligned title with gradient animation */}
                <h3 style={gradientTextStyle}>Your Sol-Wallet</h3>
                {/* Right-aligned connect button */}
                <WalletMultiButton />
              </div>
              <WalletDisplay />
              <div style={{ marginTop: "20px" }}>
                <SolToUsdChart /> {/* Real-Time SOL to USD Chart */}
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </main>
    </div>
  );
}

// Gradient text style with animation
const gradientTextStyle = {
  fontSize: '30px',
  fontWeight: 'bold',
  background: 'linear-gradient(90deg, #00FFA3, #DC1FFF)', // Start and end colors of the gradient
  WebkitBackgroundClip: 'text', // Ensures gradient is applied to text
  WebkitTextFillColor: 'transparent', // Makes the background visible through the text
  backgroundClip: 'text',
  animation: 'gradient-animation 3s ease infinite', // Animation for gradient
  display: 'inline-block',
};

// CSS Keyframe for gradient animation
const styles = `
  @keyframes gradient-animation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Inject keyframes into the page
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);




const WalletDisplay = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const { setPublicKey } = useWalletContext();

  useEffect(() => {
    if (publicKey) {
      connection
        .getBalance(publicKey)
        .then((balance) => setBalance(balance / LAMPORTS_PER_SOL))
        .catch((error) => console.error("Error fetching balance:", error));
      setPublicKey(publicKey);
    } else {
      setBalance(null);
      setPublicKey(null);
    }
  }, [publicKey, connection, setPublicKey]);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
      {publicKey ? (
        <div style={{
          backgroundColor: '#1a1a1a', // Dark container background
          padding: '20px',            // Padding inside the container
          borderRadius: '12px',        // Rounded corners for smooth look
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
          color: '#ffffff',            // White text for contrast
          width: '100%',               // Full width container
          maxWidth: '500px',           // Max width for responsiveness
          textAlign: 'left',           // Ensure text is left-aligned
        }}>
          <h3 style={{ marginBottom: '10px', fontSize: '1.2em' }}>Wallet Information</h3>
          <p style={{ margin: 0 }}>
            <strong>Address: </strong>
            {publicKey.toBase58()}
          </p>
          <p style={{ margin: 0, marginTop: '10px' }}>
            <strong>Balance: </strong>
            {balance !== null ? `${balance} SOL` : "Loading..."}
          </p>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#333',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          color: '#ffffff',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'left',            // Ensure text is left-aligned
        }}>
          <h3 style={{ marginBottom: '10px', fontSize: '1.2em' }}>No Wallet Connected</h3>
          <p>Please connect your wallet to view the details.</p>
        </div>
      )}
    </div>
  );
};
