"use client";

import React, { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWalletContext } from "../WalletContext"; // Import the context
import { PublicKey } from "@solana/web3.js";
import { Sidebar } from "../Sidebar";
import "./transaction.css";

export default function TransactionHistory() {
  const { publicKey } = useWalletContext(); // Get the publicKey from context
  const { connection } = useConnection();
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSignature, setShowSignature] = useState<boolean>(false); // Toggle signature display

  useEffect(() => {
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
        console.log("Fetched signatures:", signatures); // Debugging: check signatures

        const transactions = await Promise.all(
          signatures.map(async (signatureInfo) => {
            console.log("Fetching transaction details for signature:", signatureInfo.signature); // Debugging

            const transactionDetails = await connection.getTransaction(signatureInfo.signature);
            console.log("Transaction details:", transactionDetails); // Debugging: log transaction details

            if (transactionDetails) {
              const message = transactionDetails.transaction.message;
              const sender = message.accountKeys[0].toString(); // Sender is typically the first account
              const receiver = message.accountKeys[1].toString(); // Receiver is typically the second account

              const amount =
                (transactionDetails?.meta?.postBalances?.[0] ?? 0) -
                (transactionDetails?.meta?.preBalances?.[0] ?? 0); // Safe access with default values
              const date = new Date((transactionDetails?.blockTime ?? 0) * 1000).toLocaleString(); // Safe access with default value

              return {
                signature: signatureInfo.signature,
                slot: signatureInfo.slot,
                confirmationStatus: signatureInfo.confirmationStatus,
                amount: amount / 1e9, // Convert lamports to SOL
                date: date,
                sender: sender,
                receiver: receiver,
              };
            } else {
              console.warn("Transaction details not found for signature:", signatureInfo.signature);
              return null; // If transactionDetails is not found, skip this entry
            }
          })
        );

        const validTransactions = transactions.filter((tx) => tx !== null); // Filter out null values
        setTransactionHistory(validTransactions);
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
      <main style={{ flexGrow: 1, padding: "20px", position: "relative", transition: "margin-left 0.45s" }}>
        <h2 className = "transactionheading">Transaction History</h2>
        <button

          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            backgroundColor: showSignature ? "#8884d8" : "#f44336", // Green if showing signature, red otherwise
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "5px",
            marginTop: "5px",
          }}
          onClick={() => setShowSignature(!showSignature)}
        >
          {showSignature ? "Hide Signature" : "Show Signature"}
        </button>
        {loading ? (
          <p>Loading transaction history...</p>
        ) : transactionHistory.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {showSignature ? (
                  <th style={{ border: "1px solid black", padding: "8px" }}>Signature</th>
                ) : (
                  <>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Sender</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Receiver</th>
                  </>
                )}
                <th style={{ border: "1px solid black", padding: "8px" }}>Slot</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Confirmation Status</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Amount (SOL)</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((tx, index) => (
                <tr key={index}>
                  {showSignature ? (
                    <td style={{ border: "1px solid black", padding: "8px" }}>{tx.signature}</td>
                  ) : (
                    <>
                      <td style={{ border: "1px solid black", padding: "8px" }}>{tx.sender}</td>
                      <td style={{ border: "1px solid black", padding: "8px" }}>{tx.receiver}</td>
                    </>
                  )}
                  <td style={{ border: "1px solid black", padding: "8px" }}>{tx.slot}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{tx.confirmationStatus}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{tx.amount}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transaction history found.</p>
        )}
      </main>
    </div>
  );
}
