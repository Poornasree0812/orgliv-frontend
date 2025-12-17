import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./FarmerIncomeChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function FarmerIncomeChart({ monthsToShow = 6 }) {
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

  const fetchMonthlyIncome = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/farmer/monthly-income", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const arr = res.data || [];
      arr.sort((a, b) => (a.month > b.month ? 1 : -1));
      const sliced = arr.slice(-monthsToShow);

      setLabels(sliced.map((r) => r.month));
      setDataPoints(sliced.map((r) => r.income));
    } catch (err) {
      console.error("Chart fetch error:", err);
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Income (₹)",
        data: dataPoints,
        fill: false,
        borderColor: "green",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="income-chart-wrapper">
      {labels.length === 0 ? <p>No data available</p> : <Line data={chartData} />}
    </div>
  );
}

export default FarmerIncomeChart;
