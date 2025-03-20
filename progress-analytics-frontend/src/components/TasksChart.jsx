"use client"


import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// eslint-disable-next-line react/prop-types
const TasksChart = ({ dateRange }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    fetchChartData(dateRange)
  }, [dateRange])

  // In TasksChart.jsx
const fetchChartData = async (range) => {
    const response = await fetch(`http://localhost:8080/api/analytics/chart-data?dateRange=${range}`);
    const data = await response.json();
    setChartData(data);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tasks Completed vs. Tasks in Progress",
      },
    },
  }

  return <Line options={options} data={chartData} />
}

export default TasksChart

