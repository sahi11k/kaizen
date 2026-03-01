import GreetingsWidget from "@/features/dashboard/components/GreetingsWidget";
import JournalsWidget from "@/features/dashboard/components/JournalsWidget";
import ProgressChartWidget from "@/features/dashboard/components/ProgressChartWidget";
import TaskListWidget from "@/features/dashboard/components/TaskListWidget";
import TCPWidget from "@/features/dashboard/components/TCPWidget";
import TotalHoursWidget from "@/features/dashboard/components/TotalHoursWidget";

export const CARD_GRID = [
  {
    span: "col-span-12",
    content: <GreetingsWidget key="greet" />,
    key: "greet",
    height: "h-40",
  },
  {
    span: "col-span-12 lg:col-span-4",
    content: <TotalHoursWidget key="total-hours" />,
    key: "total-hours",
    height: "h-100",
  },
  {
    span: "col-span-12 md:col-span-6 lg:col-span-4",
    content: <JournalsWidget key="journal" />,
    key: "journals",
    height: "h-100",
  },
  {
    span: "col-span-12 md:col-span-6 lg:col-span-4",
    content: <TaskListWidget key="tasks" />,
    key: "tasks",
    height: "h-100",
  },
  {
    span: "col-span-12 lg:col-span-8",
    content: <ProgressChartWidget key="progress" />,
    key: "progress",
    height: "h-100",
  },
  {
    span: "col-span-12 lg:col-span-4",
    content: <TCPWidget key="taskCompletionPercentage" />,
    key: "taskCompletionPercentage",
    height: "h-100",
  },
];
