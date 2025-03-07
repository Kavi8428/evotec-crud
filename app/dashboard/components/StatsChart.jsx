// StatsChart.jsx
'use client'

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsChart({ stats }) {
  const chartData = {
    labels: stats.map(stat => stat.title),
    datasets: [{
      label: 'Metrics',
      data: stats.map(stat => {
        if (stat.title === "Total Visitors") {
          return parseInt(stat.value.replace(/,/g, ''));
        }
        if (stat.title === "Avg. Watch Time") {
          return parseInt(stat.value);
        }
        return stat.value;
      }),
      backgroundColor: [
        'rgba(37, 99, 235, 0.6)',  // Blue for Total Movies
        'rgba(22, 163, 74, 0.6)',  // Green for Total Visitors
        'rgba(147, 51, 234, 0.6)', // Purple for Active Users
        'rgba(234, 88, 12, 0.6)',  // Orange for Avg. Watch Time
      ],
      borderColor: [
        'rgb(37, 99, 235)',
        'rgb(22, 163, 74)',
        'rgb(147, 51, 234)',
        'rgb(234, 88, 12)',
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dashboard Metrics Overview'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Metrics'
        }
      }
    }
  };

  return (
    <div className="h-[400px]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}