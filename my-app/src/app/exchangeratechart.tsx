import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SolToUsdChart() {
  const [chartData, setChartData] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [high24h, setHigh24h] = useState<number>(0);
  const [low24h, setLow24h] = useState<number>(0);
  const [change24h, setChange24h] = useState<number>(0);

  // Fetch the SOL to USD exchange rate periodically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/solana"
        );
        const rate = response.data.market_data.current_price.usd;
        const high = response.data.market_data.high_24h.usd;
        const low = response.data.market_data.low_24h.usd;
        const change = response.data.market_data.price_change_percentage_24h;

        setCurrentPrice(rate);
        setHigh24h(high);
        setLow24h(low);
        setChange24h(change);
        
        setTimestamps((prev) => [...prev, new Date().toLocaleTimeString()]);
        setChartData((prev) => [...prev, rate]);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "SOL to USD",
        data: chartData,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",  // Left align everything
      padding: "10px",
      width: "99%",             // Ensure full width
      borderRadius: "20px",      // Rounded borders for the entire container
      backgroundColor: "#1a1a1a",  // Background color for better contrast
      color: "#fff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add subtle shadow for depth
    }}>
      {/* SOL/USDC Display */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%", // Set width to 100% for better responsiveness
        padding: "10px",
        borderRadius: "12px",
        backgroundColor: "#333",
        marginBottom: "10px",
      }}>
        <div style={{ fontWeight: "bold" }}>SOL / USDC</div>
        <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>${currentPrice}</div>
      </div>

      {/* 24h change, high, low */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%", // Set width to 100% for better responsiveness
        padding: "10px",
        borderRadius: "12px",
        backgroundColor: "#444",
        fontSize: "0.9em",
        marginBottom: "20px",
      }}>
        <div>24h Change: <span style={{ color: change24h < 0 ? "red" : "green" }}>{change24h.toFixed(2)}%</span></div>
        <div>24h High: ${high24h}</div>
        <div>24h Low: ${low24h}</div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: "250px", padding: "10px" }}> {/* Adjust height */}
        <Line 
          data={data}
          options={{
            maintainAspectRatio: false,  // Allow the chart to expand fully
          }} 
        />
      </div>
    </div>
  );
}
