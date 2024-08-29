"use client";

import React, { useEffect, useState } from 'react';
import { getTransactionHistory } from './gettransaction'; // Adjust the path to where your gettransaction.ts file is located
import { Sidebar } from "../Sidebar"; // Correct path to Sidebar component

const walletAddress = '6LG6a1aUE34N8hVsZkEHaq4A1v7oYsSqHnM1Rzb2y7Kq'; // Replace with your actual wallet address

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const txHistory = await getTransactionHistory(walletAddress);
      setTransactions(txHistory);
    }

    fetchTransactions();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.45s" }}>
        <h2>Transaction History</h2>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((tx, index) => (
              <li key={index}>
                Signature: {tx.transaction.signatures[0]}
                <br />
                Slot: {tx.slot}
                <br />
                Fee: {tx.meta.fee} lamports
                <br />
                Block Time: {new Date(tx.blockTime * 1000).toLocaleString()}
                <br />
                Status: {tx.meta.err ? 'Failed' : 'Success'}
                {/* You can add more details like token transfers, etc. */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found</p>
        )}
      </main>
    </div>
  );
};

export default TransactionHistory;
