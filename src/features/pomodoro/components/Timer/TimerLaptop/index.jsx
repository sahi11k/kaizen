import TimerContent from "@/features/pomodoro/components/Timer/TimerContent";

const TimerLaptop = () => {
  return (
    <div className="hidden md:flex flex-1 flex-col p-4 xl:p-6 h-full">
      <TimerContent />
    </div>
  );
};

export default TimerLaptop;
