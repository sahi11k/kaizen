import TaskListContent from "@/components/Pomodoro/Tasks/TaskListContent";

const TaskListLaptop = () => {
  return (
    <div className="hidden lg:flex w-75 xl:w-100 px-6 flex-col border-l border-border">
      <TaskListContent />
    </div>
  );
};

export default TaskListLaptop;
