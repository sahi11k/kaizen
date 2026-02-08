import { WEEKLY_DATE_FORMAT } from "@/shared/constants/global";
import dayjs from "dayjs";

/**
 * Build chart.js data and options for last 7 days of pomodoro activity
 * - Minutes per day (sum of session.duration)
 * - Sessions completed per day (count of rows)
 *
 * Sessions are expected to have fields: created_at (ISO date), duration (minutes)
 */
export const generatePomodoroChartData = (sessions = []) => {
  if (!sessions.length) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const days = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(6 - i, "day")
  );

  const labels = days.map((d) => d.format(WEEKLY_DATE_FORMAT));

  const minutesPerDay = days.map((d) => {
    const total = sessions
      .filter((s) => dayjs(s.created_at).isSame(d, "day"))
      .reduce((acc, s) => acc + Number(s.duration || 0), 0);
    return Math.round(total);
  });

  const sessionsPerDay = days.map((d) => {
    return sessions.filter((s) => dayjs(s.created_at).isSame(d, "day")).length;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Minutes",
        data: minutesPerDay,
        backgroundColor: "#1c3f3a",
        borderRadius: 8,
        pointStyle: "circle",
        yAxisID: "yMinutes",
      },
      {
        label: "Sessions",
        data: sessionsPerDay,
        backgroundColor: "#88aca9",
        borderRadius: 8,
        pointStyle: "circle",
        yAxisID: "ySessions",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          font: { size: 13 },
        },
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      yMinutes: {
        beginAtZero: true,
        position: "left",
        title: { display: true, text: "Minutes" },
      },
      ySessions: {
        beginAtZero: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Sessions" },
        ticks: { precision: 0 },
      },
    },
  };

  return { data, options };
};
