import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Example data
const data = [
  { name: 'Jan', payroll: 4000, balance: 2400 },
  { name: 'Feb', payroll: 3000, balance: 1398 },
  { name: 'Mar', payroll: 2000, balance: 9800 },
  { name: 'Apr', payroll: 2780, balance: 3908 },
  { name: 'May', payroll: 1890, balance: 4800 },
  { name: 'Jun', payroll: 2390, balance: 3800 },
  { name: 'Jul', payroll: 3490, balance: 4300 },
];

const Linechart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="payroll" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="balance" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Linechart;
