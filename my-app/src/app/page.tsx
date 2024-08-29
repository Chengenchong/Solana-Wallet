import React from 'react';
import TransactionHistory from './transaction-history/page'; // Adjust the path to where your page.tsx file is located
import { Sidebar } from './Sidebar'; // Correct path to Sidebar component

const WalletPage = () => {
  const walletAddress = 'YourWalletAddressHere'; // Replace with your actual wallet address

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.45s" }}>
        <h1>Wallet Overview</h1>

      </main>
    </div>

  );
};

export default WalletPage;
