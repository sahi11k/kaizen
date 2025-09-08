import React from "react";
import styles from "./style.module.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const percentage = 75;
const totalHours = 100;

const TotalHoursWidget = () => {
  const data = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [100 - percentage, percentage],
        backgroundColor: ["#333", "#666"],
        borderWidth: 0,
        circumference: 360,
        rotation: -90,
      },
    ],
  };

  const options = {
    responsive: false,
    cutout: "80%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className={`card ${styles.totalHoursWidget}`}>
      <div className={`card__header ${styles.totalHoursWidgetHeader}`}>
        Total Hours Spent
      </div>
      <div className={`card__body ${styles.totalHoursWidgetBody}`}>
        <div className={styles.progressContainer}>
          <Doughnut data={data} options={options} height={180} width={180} />
          <div
            className={styles.progressText}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className={styles.progressTextValue}>
              {totalHours || 100}
            </span>
            <span className={styles.progressTextUnit}>{"H"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalHoursWidget;
