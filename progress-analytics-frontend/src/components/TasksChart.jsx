"use client";

import { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
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
import { Spinner, Alert } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const TasksChart = ({ dateRange }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch chart data
  const fetchChartData = useCallback(async (range) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/analytics/chart-data?dateRange=${range}`);
      if (!response.ok) throw new Error("Failed to fetch chart data");
      
      const data = await response.json();
      setChartData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChartData(dateRange);
  }, [dateRange, fetchChartData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "📊 Tasks Completed vs. Tasks in Progress",
      },
    },
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;
  if (!chartData.labels.length) return <Alert variant="info">No data available</Alert>;

  return <Line options={options} data={chartData} />;
};

export default TasksChart;
