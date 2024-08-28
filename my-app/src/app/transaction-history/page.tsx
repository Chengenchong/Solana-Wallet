"use client";

import { Sidebar } from "../Sidebar"; // Correct path to Sidebar component

export default function Transaction() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.45s" }}>
        <h1>Transaction Page</h1>
      </main>
    </div>
  );
}