import { Button, Card, Tooltip, EmptyState } from "@/shared/ui";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro";
import { FolderOpen } from "lucide-react";
import { Link } from "react-router";
import { getPendingTasks } from "@/features/dashboard/utils/taskListWidgetHelper";

const TaskListWidget = () => {
  const { user } = useAuthStore();
  const { data: tasks = [] } = useTasksQuery(user?.id);

  const pendingTasks = getPendingTasks(tasks);

  const noPendingTasks = pendingTasks.length === 0;

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
        {pendingTasks.map((task) => {
          return <TaskItem key={task.id} task={task} />;
        })}
      </ul>
      {noPendingTasks && (
        <EmptyState
          icon={<FolderOpen className="size-8" />}
          title="Hurray!"
          description="You have no pending tasks."
        />
      )}
    </Card>
  );
};

const TaskItem = ({ task }) => {
  return (
    <li className="flex items-center justify-between border border-border rounded-lg px-4 py-3">
      <span className="font-medium truncate min-w-0">{task.title}</span>
    </li>
  );
};

export default TaskListWidget;
