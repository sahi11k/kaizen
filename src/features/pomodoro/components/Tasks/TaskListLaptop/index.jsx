import TaskListContent from "@/features/pomodoro/components/Tasks/TaskListContent";

const TaskListLaptop = () => {
  return (
    <div className="flex flex-1 px-4 xl:px-6 md:flex-none md:w-72 xl:w-92 flex-col border-r border-border">
      <TaskListContent />
    </div>
  );
};

export default TaskListLaptop;
