import React, { useMemo } from "react";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Link } from "react-router";
import { useAuthStore } from "@/features/auth";
import { useThemeStore } from "@/features/theme";
import { useTaskSessionsQuery } from "@/features/pomodoro";
import { Card, Skeleton } from "@/shared/ui";
import { getDayKeys, getWeekStart } from "../../utils/dateRange";

const legendMargin = {
  id: "legendMargin",
  afterInit(chart) {
    const originalFit = chart.legend.fit;
    chart.legend.fit = function fit() {
      originalFit.bind(chart.legend)();
      this.height += 16;
    };
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
  legendMargin,
);

function minutesToHours(mins) {
  return (mins / 60).toFixed(1);
}

function readCssColor(variable) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

const FocusTrendChart = () => {
  const { user } = useAuthStore();
  const theme = useThemeStore((state) => state.theme);
  const { data: sessions = [], isLoading } = useTaskSessionsQuery(user?.id);

  const weekStart = getWeekStart();
  const dayKeys = useMemo(() => getDayKeys(), []);

  const thisWeekSessions = sessions.filter((s) =>
    dayjs(s.createdAt).isAfter(weekStart),
  );
  const thisWeekMins = thisWeekSessions.reduce(
    (a, s) => a + (s.duration || 0),
    0,
  );

  const trendData = useMemo(() => {
    const minsByDay = {};
    const countByDay = {};
    thisWeekSessions.forEach((s) => {
      const key = dayjs(s.createdAt).format("YYYY-MM-DD");
      minsByDay[key] = (minsByDay[key] || 0) + (s.duration || 0);
      countByDay[key] = (countByDay[key] || 0) + 1;
    });
    return dayKeys.map((key) => ({
      key,
      label: dayjs(key).format("dd").charAt(0),
      mins: minsByDay[key] || 0,
      count: countByDay[key] || 0,
    }));
  }, [thisWeekSessions, dayKeys]);

  const hasActivity = thisWeekMins > 0;

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  const primaryColor = readCssColor("--color-primary") || "#6366f1";
  const mutedColor = readCssColor("--color-muted") || "#e5e7eb";
  const mutedForegroundColor =
    readCssColor("--color-muted-foreground") || "#6b7280";

  const chartData = {
    labels: trendData.map((d) => d.label),
    datasets: [
      {
        type: "bar",
        label: "Hours focused",
        data: trendData.map((d) => Number(minutesToHours(d.mins))),
        backgroundColor: trendData.map((d) =>
          d.mins > 0 ? primaryColor : mutedColor,
        ),
        borderRadius: 6,
        maxBarThickness: 24,
        yAxisID: "y",
        order: 1,
      },
      {
        type: "bar",
        label: "Sessions completed",
        data: trendData.map((d) => d.count),
        backgroundColor: mutedForegroundColor,
        borderRadius: 6,
        maxBarThickness: 24,
        yAxisID: "y1",
        order: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          color: mutedForegroundColor,
          font: { size: 12, lineHeight: 1 },
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: false,
          borderRadius: 4,
          generateLabels: (chart) =>
            chart.data.datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: i === 0 ? primaryColor : mutedForegroundColor,
              strokeStyle: i === 0 ? primaryColor : mutedForegroundColor,
              fontColor: mutedForegroundColor,
              lineWidth: 0,
              borderRadius: 4,
              hidden: !chart.isDatasetVisible(i),
              datasetIndex: i,
            })),
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        usePointStyle: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 4,
        callbacks: {
          title: (items) => {
            const key = trendData[items[0].dataIndex]?.key;
            return key ? dayjs(key).format("dddd, MMM D") : "";
          },
          labelPointStyle: () => ({
            pointStyle: "rectRounded",
            rotation: 0,
          }),
          label: (ctx) =>
            ctx.dataset.yAxisID === "y1"
              ? `${ctx.parsed.y} session${ctx.parsed.y === 1 ? "" : "s"}`
              : `${ctx.parsed.y}h`,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        grid: { color: mutedColor },
        ticks: { color: mutedForegroundColor, font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: mutedColor },
        ticks: { color: mutedForegroundColor, font: { size: 11 } },
        title: {
          display: true,
          text: "Hours",
          color: mutedForegroundColor,
          font: { size: 13 },
          padding: { bottom: 10 },
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: { display: false },
        ticks: { color: mutedForegroundColor, font: { size: 11 }, stepSize: 1 },
      },
    },
  };

  return (
    <Card
      title="Focus & Sessions Trend"
      className="h-full"
      contentClassName="flex h-full flex-col"
    >
      {hasActivity ? (
        <div className="relative flex-1 min-h-0">
          <Chart key={theme} type="bar" data={chartData} options={chartOptions} />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="font-sans text-sm leading-snug text-center text-subtle-foreground italic">
            No sessions this week.{" "}
            <Link
              to="/dashboard/pomodoro"
              className="text-muted-foreground underline"
            >
              Start one
            </Link>
            .
          </p>
        </div>
      )}
    </Card>
  );
};

export default FocusTrendChart;
