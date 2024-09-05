"use client";

import { Sidebar } from "../Sidebar"; 
import "./Dashboard.css";
import Linechart from "./LineChart"; // Line chart
import BarChartComponent from "./BarChartComponent"; // Bar chart
import PieChartComponent from "./PieChartComponent"; // Pie chart
import EmployeeTable from "./EmployeeTable"; // Employee Table

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.45s" }}>
        <div className="dashboard-container">
          {/* Top bar with balance and payroll info */}
          <div className="top-bar">
            <div className="balance-info">
              <div className="total-balance">
                <p className="text-black">Total Balance</p>
                <h3 className="text-black">$935,332</h3>
              </div>
              <div className="expected-payroll">
                <p className="text-black">Expected Payroll</p>
                <h3 className="text-black">$346,211</h3>
              </div>
            </div>
            <div className="buttons">
              <button className="register-btn">Register Payroll</button>
              <button className="commit-btn">Commit Payroll</button>
            </div>
          </div>

          {/* Content section for chart and employee table */}
          <div className="content-section">
            <div className="chart-section">
              {/* Title for Line Chart */}
              <h2 className="chart-title text-black">Payroll and Balance Overview</h2>
              {/* Line Chart */}
              <Linechart />
            </div>
          </div>

          {/* Optional: More charts below */}
          <div className="analytics-section">
            <div className="balance-analytics">
              {/* Title for Bar Chart */}
              <h2 className="chart-title text-black">Revenue and Expenses Bar Chart</h2>
              {/* Bar Chart */}
              <BarChartComponent />
            </div>

            <div className="recent-payroll">
              {/* Title for Pie Chart */}
              <h2 className="chart-title text-black">Currency Distribution Pie Chart</h2>
              {/* Pie Chart */}
              <PieChartComponent />
            </div>
          </div>

          <div className="employee-section">
            {/* Employee Table */}
            <EmployeeTable />
          </div>
        </div>
      </main>
    </div>
  );
}
