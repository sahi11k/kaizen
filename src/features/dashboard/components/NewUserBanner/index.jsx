import { Link } from "react-router";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro";
import { useJournalsQuery } from "@/features/journals";
import { useBookmarkedQuery } from "@/features/bookmarked";

const NewUserBanner = () => {
  const { user } = useAuthStore();
  const { data: tasks = [], isLoading: tasksLoading } = useTasksQuery(user?.id);
  const { data: journals = [], isLoading: journalsLoading } = useJournalsQuery(
    user?.id,
  );
  const { data: bookmarkedItems = [], isLoading: bookmarkedLoading } =
    useBookmarkedQuery(user?.id);
  const isCheckingHistory =
    tasksLoading || journalsLoading || bookmarkedLoading;
  const isBrandNewUser =
    !isCheckingHistory &&
    tasks.length === 0 &&
    journals.length === 0 &&
    bookmarkedItems.length === 0;

  if (!isBrandNewUser) return null;

  return (
    <div className="body-base">
      Nothing tracked this week yet — start with{" "}
      <Link to="/dashboard/pomodoro" className="text-link">
        Pomodoro
      </Link>
      ,{" "}
      <Link to="/dashboard/journals/new" className="text-link">
        Journals
      </Link>
      , or{" "}
      <Link to="/dashboard/bookmarked" className="text-link">
        Bookmarked
      </Link>
      .
    </div>
  );
};

export default NewUserBanner;
