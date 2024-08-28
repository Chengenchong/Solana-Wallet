"use client"; // Ensure this page is treated as a client-side component

import { Sidebar } from "./Sidebar"; // Adjust path as necessary

export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.45s" }}>
        <h1>Home</h1>
      </main>
    </div>
  );
}