import { Button, Card, Tooltip, EmptyState } from "@/shared/ui";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery, useTasksStore } from "@/features/pomodoro";
import TaskIllustration from "@/assets/illustrations/empty-tasks.svg?react";
import { Link, useNavigate } from "react-router";
import { getPendingTasks } from "@/features/dashboard/utils/taskListWidgetHelper";
import { Play } from "lucide-react";

const TaskListWidget = () => {
  const { user } = useAuthStore();
  const { data: tasks = [] } = useTasksQuery(user?.id);
  const setCurrentTask = useTasksStore((s) => s.setCurrentTask);
  const navigate = useNavigate();

  const pendingTasks = getPendingTasks(tasks);
  const noPendingTasks = pendingTasks.length === 0;

  const handleTaskClick = (task) => {
    setCurrentTask(task);
    navigate("/dashboard/pomodoro");
  };

  return (
    <Card
      title="Pending Tasks"
      className="border-none shadow-none h-full"
      contentClassName="flex-1"
      footer={
        <Link to="/dashboard/pomodoro" className="w-full block">
          <Button className="w-full">
            {noPendingTasks ? "Plan your day" : "Complete pending tasks now"}
          </Button>
        </Link>
      }
    >
      <ul className="space-y-2">
        {pendingTasks.map((task) => (
          <TaskItem key={task.id} task={task} onClick={() => handleTaskClick(task)} />
        ))}
      </ul>
      {noPendingTasks && (
        <EmptyState
          icon={<div className="w-40"><TaskIllustration /></div>}
          title="Hurray!"
          description="You have no pending tasks."
          titleClassName="text-3xl font-semibold"
          descriptionClassName="text-sm text-muted-foreground"
        />
      )}
    </Card>
  );
};

const TaskItem = ({ task, onClick }) => {
  return (
    <li
      className="group flex items-center justify-between border border-border rounded-lg px-4 py-3 cursor-pointer hover:bg-muted transition-colors"
      onClick={onClick}
    >
      <span className="font-medium truncate min-w-0">{task.title}</span>
      <Tooltip content="Open in Pomodoro">
        <Play className="size-3.5 shrink-0 ml-3 text-muted-foreground group-hover:text-primary transition-colors fill-current" />
      </Tooltip>
    </li>
  );
};

export default TaskListWidget;
