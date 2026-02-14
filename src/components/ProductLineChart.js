import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import "./ProductLineChart.css";

const ProductLineChart = ({ products }) => {

  if (!products || products.length === 0) return null;

  const chartData = products.map((product, index) => ({
    name: product.title.substring(0, 8),
    price: product.price
  }));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Price Trend</h3>

      <ResponsiveContainer width="90%" height={260}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductLineChart;
