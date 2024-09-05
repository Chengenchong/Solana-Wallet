import React from 'react';
import './EmployeeTable.css'; // Your CSS for the table

// Mock employee data
const employees = [
  { id: 1, name: 'Lindsey Stroud', email: 'lindsey.stroud@gmail.com', currency: 'USDC', role: 'Manager', payroll: '$62,442' },
  { id: 2, name: 'Nicci Troiani', email: 'nicci.troiani@gmail.com', currency: 'USDC', role: 'Manager', payroll: '$82,392' },
  { id: 3, name: 'George Fields', email: 'george.fields@gmail.com', currency: 'ETH', role: 'CMO', payroll: '$518,333' },
  { id: 4, name: 'Rebecca Moore', email: 'rebecca.moore@gmail.com', currency: 'MATIC', role: 'Manager', payroll: '$283,333' },
  { id: 5, name: 'Jane Doe', email: 'jane.doe@gmail.com', currency: 'DAI', role: 'Engineer', payroll: '$78,444' },
  { id: 6, name: 'Jones Dermot', email: 'dermot.jones@gmail.com', currency: 'USDC', role: 'Developer', payroll: '$84,992' },
  { id: 7, name: 'Martin Merces', email: 'martin.merces@gmail.com', currency: 'USDC', role: 'Manager', payroll: '$61,222' },
  { id: 8, name: 'Franz Ferdinand', email: 'franz.ferdinand@gmail.com', currency: 'MATIC', role: 'Manager', payroll: '$73,224' },
  { id: 9, name: 'John Smith', email: 'john.smith@gmail.com', currency: 'ETH', role: 'CFO', payroll: '$422,343' },
  { id: 10, name: 'Judith Williams', email: 'judith.williams@gmail.com', currency: 'USDC', role: 'Designer', payroll: '$69,212' },
];

const EmployeeTable: React.FC = () => {
  return (
    <div className="employee-table-container">
      <header className="employee-table-header">
        <h2 className="text-black">Employees</h2>
        <div className="employee-table-actions">
          <button className="register-btn">Register Employee</button>
          <button className="pay-now-btn">Pay Now</button>
        </div>
      </header>

      <table className="employee-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th className="text-black">Name</th>
            <th className="text-black">Email</th>
            <th className="text-black">Currency</th>
            <th className="text-black">Role</th>
            <th className="text-black">Payroll</th>
            <th className="text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td><input type="checkbox" /></td>
              {/* Apply the text-black class to all employee info */}
              <td className="text-black">{employee.name}</td>
              <td className="text-black">{employee.email}</td>
              <td className="text-black">{employee.currency}</td>
              <td className="text-black">{employee.role}</td>
              <td className="text-black">{employee.payroll}</td>
              <td>
                <button className="edit-btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
