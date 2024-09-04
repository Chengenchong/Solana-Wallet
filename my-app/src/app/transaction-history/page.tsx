"use client";

import React, { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWalletContext } from "../WalletContext"; // Import the context
import { PublicKey } from "@solana/web3.js";
import { Sidebar } from "../Sidebar";

export default function TransactionHistory() {
  const { publicKey } = useWalletContext(); // Get the publicKey from context
  const { connection } = useConnection();
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Connection:", connection); // Debugging: log the connection
    if (!connection) {
      console.error("No connection available.");
      return;
    }

    const fetchTransactionHistory = async () => {
      if (!publicKey) {
        setTransactionHistory([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const walletPublicKey = new PublicKey(publicKey.toString());
        const signatures = await connection.getSignaturesForAddress(walletPublicKey, { limit: 10 });
        setTransactionHistory(signatures);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        setTransactionHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [publicKey, connection]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.45s" }}>
        <h2>Transaction History</h2>
        {loading ? (
          <p>Loading transaction history...</p>
        ) : transactionHistory.length > 0 ? (
          <ul>
            {transactionHistory.map((tx, index) => (
              <li key={index}>
                <p>Transaction Signature: {tx.signature}</p>
                <p>Slot: {tx.slot}</p>
                <p>Confirmation Status: {tx.confirmationStatus}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transaction history found.</p>
        )}
      </main>
    </div>
  );
};
