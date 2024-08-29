import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com'); // Use testnet or devnet URL if needed

export async function getTransactionHistory(walletAddress: string) {
  try {
    const publicKey = new PublicKey(walletAddress);
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 }); // Adjust the limit as needed

    const transactions = await Promise.all(
      signatures.map(async (signature) => {
        const transaction = await connection.getTransaction(signature.signature);
        return transaction;
      })
    );

    return transactions;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
}
