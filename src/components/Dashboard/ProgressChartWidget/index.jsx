import React from "react";
import styles from "./style.module.css";
import widgetStyles from "../styles.module.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChartWidget = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Focus Hours",
        data: [2, 4, 3, 5, 6, 4, 7], // your streak/progress data here
        backgroundColor: "rgba(197, 83, 34, 0.8)", // green-500
        borderRadius: 8,
      },
      {
        label: "Pomodoro complted",
        data: [2, 4, 3, 5, 6, 4, 7], // your streak/progress data here
        backgroundColor: "rgba(34, 197, 113, 0.8)", // green-500
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // hide legend if you want minimal look
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: { color: "#ccc" },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
        ticks: { color: "#ccc" },
      },
    },
  };

  return (
    <div className={`card ${styles.progressChartWidget}`}>
      <div className={`card__header ${styles.progressChartWidgetHeader}`}>
        <span>Weekly Progress</span>
        <span className={widgetStyles.tag}> Last 7 Days</span>
      </div>
      <div className={`card__body ${styles.progressChartWidgetBody}`}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProgressChartWidget;
