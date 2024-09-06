"use client"; // Ensures this is a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes, FaWallet, FaHistory, FaCreditCard, FaTachometerAlt } from "react-icons/fa";
import "./sidebar.css";


const navItems = [
  { name: "Sol Wallet", icon: <FaWallet />, route: "/" },
  { name: "Dashboard", icon: <FaTachometerAlt />, route: "/Dashboard-page" },
  { name: "Transaction", icon: <FaHistory />, route: "/transaction-history" },
  { name: "Sol Card", icon: <FaCreditCard />, route: "/sol-card" }
];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route); // Navigate to the specified route
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="inner">
        <header>
          <button
            type="button"
            className="sidebar-burger"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size="24" /> : <FaBars size="24" />}
          </button>
        </header>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleNavigation(item.route)}
            >
              {item.icon} 
              <p>{item.name}</p>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};