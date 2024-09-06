"use client";

import React, { useState } from 'react';
import './cardpage.css';
import { Sidebar } from "../Sidebar";

const CardsPage: React.FC = () => {
  const [showCardOptions, setShowCardOptions] = useState(false);

  const handleOrderNewCardClick = () => {
    setShowCardOptions(true);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div className="cards-page">
        {!showCardOptions ? (
          // Initial View: List of Cards
          <>
            <header className="header">
              {/* Apply gradient animation to the "Sol-Cards" heading */}
              <h1 className="gradient-text">Sol-Cards</h1>
              <div className="header-actions">
                <button className="action-button">Edit limits</button>
                <button className="action-button">Add money</button>
              </div>
            </header>

            <section className="cards-section">
              <div className="card-option" onClick={handleOrderNewCardClick}>
                <div className="icon-placeholder">+</div>
                <div>
                  <h2>Order a new card</h2>
                  <p>Get another card for this account.</p>
                </div>
              </div>

              <div className="card-item">
                <div className="card-image-placeholder">
                  <img src="SolcardTemp.png" alt="Card" />
                </div>
                <div>
                  <h2>Digital card •••• 9687</h2>
                  <p>Spend your Cypto Now</p>
                </div>
                <span className="arrow-icon">&#8250;</span>
              </div>
            </section>
          </>
        ) : (
          // Choose Debit Card View
          <section className="choose-card-section">
            <h2>Choose your debit card</h2>

            <div className="card-selection">
              <div className="card-option-large">
                <div className="card-info">
                  <h3>DIGITAL</h3>
                  <p>A card that lives online and works everywhere. Easy, secure, and always on hand.</p>
                  <div className="tag">Free</div>
                  <p className="cta">Get it instantly &#8250;</p>
                </div>
                <div className="card-image">
                  <img src="SolcardTemp.png" alt="Digital Card" />
                </div>
              </div>

              <div className="card-option-large">
                <div className="card-info">
                  <h3>PHYSICAL</h3>
                  <p>Spend and withdraw money around the world. In your wallet and on your side.</p>
                  <div className="tag">Free</div>
                  <p className="cta">Arrives within 5 days &#8250;</p>
                </div>
                <div className="card-image">
                  <img src="SolcardTemp.png" alt="Physical Card" />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
