import React, { useState } from 'react';
import './EmployeeTable.css'; // Your CSS for the table
import { FaMoneyCheckAlt, FaShieldAlt, FaTimes } from 'react-icons/fa'; // Icons

// Mock employee data
const employees = [
  { id: 1, name: 'Lindsey Stroud', email: 'lindsey.stroud@gmail.com', wallet: '5p96F1...', currency: 'USDC', role: 'Manager', payroll: 62442 },
  { id: 2, name: 'Nicci Troiani', email: 'nicci.troiani@gmail.com', wallet: '9o27B6...', currency: 'USDC', role: 'Manager', payroll: 82392 },
  { id: 3, name: 'George Fields', email: 'george.fields@gmail.com', wallet: '2a97C2...', currency: 'SOL', role: 'CMO', payroll: 518333 },
  { id: 4, name: 'Rebecca Moore', email: 'rebecca.moore@gmail.com', wallet: '8f83B7...', currency: 'USDC', role: 'Manager', payroll: 283333 },
  { id: 5, name: 'Jane Doe', email: 'jane.doe@gmail.com', wallet: '1h57R2...', currency: 'USDC', role: 'Engineer', payroll: 78444 },
  { id: 6, name: 'Jones Dermot', email: 'dermot.jones@gmail.com', wallet: '6h23R5...', currency: 'SOL', role: 'Developer', payroll: 84992 },
  { id: 7, name: 'Martin Merces', email: 'martin.merces@gmail.com', wallet: '2g38R9...', currency: 'USDC', role: 'Manager', payroll: 61222 },
  { id: 8, name: 'Franz Ferdinand', email: 'franz.ferdinand@gmail.com', wallet: '4t97C8...', currency: 'USDC', role: 'Manager', payroll: 73224 },
  { id: 9, name: 'John Smith', email: 'john.smith@gmail.com', wallet: '3h46A1...', currency: 'USDC', role: 'CFO', payroll: 422343 },
  { id: 10, name: 'Judith Williams', email: 'judith.williams@gmail.com', wallet: '5h37F2...', currency: 'SOL', role: 'Designer', payroll: 69212 },
];

const EmployeeTable: React.FC = () => {
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]); // To store selected employee IDs
  const [showCard, setShowCard] = useState(false); // To toggle the confirmation card

  // Toggle the checkbox selection
  const handleCheckboxChange = (id: number) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((empId) => empId !== id) // Remove if already selected
        : [...prevSelected, id] // Add if not selected
    );
  };

  // Handle Pay Now button click
  const handlePayNowClick = () => {
    if (selectedEmployees.length > 0) {
      setShowCard(true); // Show the confirmation card
    } else {
      alert('Please select at least one employee to pay.');
    }
  };

  // Get total payroll amount for selected employees
  const totalPayroll = selectedEmployees.reduce((acc, empId) => {
    const employee = employees.find((emp) => emp.id === empId);
    return acc + (employee?.payroll || 0);
  }, 0);

  return (
    <div className="employee-table-container">
      <header className="employee-table-header">
        <h2 className="text-black">Employees</h2>
        <div className="employee-table-actions">
          <button className="register-btn">Register Employee</button>
          <button className="pay-now-btn" onClick={handlePayNowClick}>Pay Now</button>
        </div>
      </header>

      <table className="employee-table">
        <thead>
          <tr>
            <th className="text-black">Name</th>
            <th className="text-black">Email</th>
            <th className="text-black">Currency</th>
            <th className="text-black">Payroll</th>
            <th className="text-black">Role</th>
            <th className="text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => handleCheckboxChange(employee.id)}
                />
              </td>
              <td className="text-black">{employee.name}</td>
              <td className="text-black">{employee.email}</td>
              <td className="text-black">{employee.currency}</td>
              <td className="text-black">{employee.role}</td>
              <td className="text-black">${employee.payroll.toLocaleString()}</td>
              <td>
                <button className="edit-btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCard && (
        <div className="confirmation-card">
          <div className="card-header">
            <h3>Payment Confirmation</h3>
            <button className="close-btn" onClick={() => setShowCard(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="card-content">
            <p>You are about to pay {selectedEmployees.length} employees a total of ${totalPayroll.toLocaleString()}.</p>
            <ul className="employee-list">
              {selectedEmployees.map((empId) => {
                const employee = employees.find((emp) => emp.id === empId);
                return (
                  <li key={empId}>
                    <strong>{employee?.name}</strong> ({employee?.wallet}) - ${employee?.payroll.toLocaleString()}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="card-actions">
            <button className="private-pay-btn">
              <FaShieldAlt /> Private Transaction
            </button>
            <button className="confirm-pay-btn" onClick={() => alert("Payments processed!")}>
              <FaMoneyCheckAlt /> Confirm Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
