import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Tooltip } from "@/shared/ui/tooltip";
import useTasksStore from "@/features/pomodoro/store/tasks";
import { FolderOpen, Play } from "lucide-react";
import { Link } from "react-router";
import { useShallow } from "zustand/react/shallow";

const TaskListWidget = () => {
  const { tasks } = useTasksStore(
    useShallow((state) => ({
      tasks: state.tasks,
      setTasks: state.setTasks,
      setCurrentTask: state.setCurrentTask,
      currentTask: state.currentTask,
      updateTaskInStore: state.updateTask,
      tasksFetchStatus: state.tasksFetchStatus,
      setTasksFetchStatus: state.setTasksFetchStatus,
    }))
  );

  const pendingTasks = getPendingTasks(tasks);

  const noPendingTasks = pendingTasks.length === 0;

  return (
    <Card className="border-none shadow-none h-full">
      <CardHeader>
        <CardTitle>Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {pendingTasks.map((task) => {
            return <TaskItem key={task.id} task={task} />;
          })}
        </ul>
        {noPendingTasks && (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <FolderOpen className="size-8" />
              <div className="flex flex-col items-center">
                <h3 className="heading-3">Hurray!</h3>
                <p className="body-description">You have no pending tasks.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link to="/dashboard/pomodoro" className="w-full block">
          <Button className="w-full">
            {noPendingTasks ? "Plan your day" : "Focus on pending tasks"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const TaskItem = ({ task }) => {
  return (
    <li className="flex items-center justify-between border border-border rounded-md px-4 py-2 gap-2">
      <span className="font-medium truncate">
        {task.title}Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam, quos.
      </span>
      <Tooltip content="Openwith Pomodoro">
        <Link to="/dashboard/pomodoro">
          <Button
            rounded
            variant="outline"
            className="!h-6 w-6 !p-3 border bg-transparent hover:text-primary hover:bg-transparent hover:border-primary"
            icon={<Play className="size-2.5" fill="currentColor" />}
          />
        </Link>
      </Tooltip>
    </li>
  );
};

const getPendingTasks = (tasks = []) => {
  let count = 0;
  let filteredTasks = [];
  for (const task of tasks) {
    if (!task.completed) {
      count++;
      filteredTasks.push(task);
    }
    if (count === 5) break;
  }
  return filteredTasks;
};

export default TaskListWidget;
