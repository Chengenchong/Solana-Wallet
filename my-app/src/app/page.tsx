"use client";

import React, { useMemo, useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction, clusterApiUrl } from '@solana/web3.js';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Sidebar } from "./Sidebar";
import { useWalletContext } from "./WalletContext";
import SolToUsdChart from "./exchangeratechart"; // Import the chart component
import "./globals.css";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solAmount, setSolAmount] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
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

  // Handlers for button clicks (to be implemented)
  const handleReceive = () => {
    console.log("Receive clicked");
    // Add functionality for receiving SOL
  };

  const handleSwap = () => {
    console.log("Swap clicked");
    // Add functionality for swapping tokens
  };

  const handleSend = async () => {
    if (!publicKey) {
        toast.error("Please provide all required details.");
        return;
    }
    if (!recipientAddress || !solAmount) {
        toast.error("Please provide the recipient's address and the amount.");
        return;
    }

    try {
        const recipientPublicKey = new PublicKey(recipientAddress);
        const { blockhash } = await connection.getLatestBlockhash();
        
        // Create a transaction to send SOL
        const transaction = new Transaction();
        transaction.recentBlockhash = blockhash; // Set the recent blockhash
        transaction.feePayer = publicKey; // Set the fee payer
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipientPublicKey,
                lamports: parseFloat(solAmount) * LAMPORTS_PER_SOL, // Convert SOL to lamports
            })
        );

        // Get the wallet provider (e.g., Phantom) to sign the transaction
        const { solana } = window as any;
        if (solana && solana.isPhantom) {
            const signedTransaction = await solana.signTransaction(transaction);

            // Send the signed transaction using sendRawTransaction
            const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
                skipPreflight: false,
                preflightCommitment: "confirmed",
            });
            console.log("Transaction Signature:", signature);
            toast.success(`Transaction Successful: ${signature}`);
            setIsModalOpen(false);
            } else {
                toast.error("Phantom Wallet not found! Please install it from https://phantom.app");
            }
            } catch (error) {
                console.error("Transaction failed:", error);
                toast.error("Transaction failed. Please try again.");
            }
        };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
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
          {publicKey ? publicKey.toBase58() : "No Wallet Connected"}
        </p>
        <p style={{ margin: 0, marginTop: '10px' }}>
          <strong>Balance: </strong>
          {balance !== null ? `${balance} SOL` : "Loading..."}
        </p>
      </div>

      {/* Button container */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',         // Set flex direction to row for side-by-side buttons
        justifyContent: 'flex-start', // Align buttons to the left
        alignItems: 'center',         // Align buttons vertically in the center
        marginLeft: '-30px',          // Move buttons slightly to the left
        marginRight: '40px',          // Add margin to the right side
        gap: '50px',                  // Increase space between buttons
      }}>
        <button style={buttonStyle} onClick={handleReceive}>Receive</button>
        <button style={buttonStyle} onClick={openModal}>Send</button>
        <button style={buttonStyle} onClick={handleSwap}>Swap</button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Modal for Sending SOL */}
      {isModalOpen && (
        <motion.div
          className="modalBackdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modalContent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="modalTitle">Send SOL</h2>
            <input
              type="text"
              placeholder="Recipient's Wallet Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="modalInput"
            />
            <div className="solAmountContainer">
              <input
                type="number"
                placeholder="Amount in SOL"
                value={solAmount}
                onChange={(e) => setSolAmount(e.target.value)}
                className="modalInput"
              />
            </div>

            <p className="myrEquivalent">
              ≈ {parseFloat(solAmount) * 100 || 0} MYR
            </p>
            <div className="modalActions">
              <button onClick={handleSend} className="sendButton">
                Send
              </button>
              <button onClick={closeModal} className="cancelButton">
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
    
  );
};

// Button styles
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#633AC7', // Button background color
  color: '#FFFFFF', // Button text color
  padding: '10px 20px', // Padding for buttons
  borderRadius: '8px', // Rounded corners
  border: 'none', // Remove default border
  cursor: 'pointer', // Pointer cursor on hover
  fontWeight: 'bold',
  fontSize: '1em',
  width: '100px', // Set width for button size consistency
  textAlign: 'center' as 'center', // Ensure this is typed correctly
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add subtle shadow for depth
  transition: 'background-color 0.3s ease', // Smooth background transition
};