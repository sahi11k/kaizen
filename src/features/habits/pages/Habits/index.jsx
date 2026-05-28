import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import HabitDetailPlaceholder from "@/features/habits/components/HabitDetailPlaceholder";
import HabitForm from "@/features/habits/components/HabitForm";
import HabitList from "@/features/habits/components/HabitList";
import {
  HABIT_TARGET_TYPES,
  useArchiveHabitMutation,
  useCompleteHabitMutation,
  useCreateHabitMutation,
  useDeleteHabitMutation,
  useHabitEntriesForDateQuery,
  useHabitsQuery,
  useUnarchiveHabitMutation,
  useUncompleteHabitMutation,
  useUpdateHabitMutation,
} from "@/features/habits";
import {
  getTodayDateKey,
  isHabitCompletedForDate,
  isHabitDueForDate,
} from "@/features/habits/utils";
import { useAuthStore } from "@/features/auth";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import { CREATE, EDIT } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";
import { Button, ResponsiveDialog, Toast } from "@/shared/ui";

const { toast } = Toast;

const Habits = () => {
  const { user } = useAuthStore();
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(CREATE);
  const [editingHabit, setEditingHabit] = useState(null);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [selectedDateKey, setSelectedDateKey] = useState(getTodayDateKey());
  const { mutate: createHabit, isPending: isCreating } =
    useCreateHabitMutation();
  const { mutate: updateHabit, isPending: isUpdating } =
    useUpdateHabitMutation();
  const { mutate: archiveHabit } = useArchiveHabitMutation();
  const { mutate: unarchiveHabit } = useUnarchiveHabitMutation();
  const { mutate: completeHabit } = useCompleteHabitMutation();
  const { mutate: uncompleteHabit } = useUncompleteHabitMutation();
  const { mutate: deleteHabit, isPending: isDeleting } =
    useDeleteHabitMutation();
  const { data: allHabits = [] } = useHabitsQuery(user?.id, "all");
  const { data: selectedDateEntries = [] } = useHabitEntriesForDateQuery(
    user?.id,
    selectedDateKey,
  );
  const isSaving = isCreating || isUpdating;
  const isSelectedHabitDoneOnSelectedDate = selectedHabit
    ? isHabitCompletedForDate(
        selectedHabit.id,
        selectedDateEntries,
        selectedDateKey,
      )
    : false;
  useDocumentTitle(BROWSER_TAB_TITLES.HABITS);

  useEffect(() => {
    if (!selectedHabit?.id) return;

    const nextSelectedHabit = allHabits.find(
      (habit) => habit.id === selectedHabit.id,
    );
    if (nextSelectedHabit) setSelectedHabit(nextSelectedHabit);
  }, [allHabits, selectedHabit?.id]);

  const openCreateForm = () => {
    setMode(CREATE);
    setEditingHabit(null);
    setShowModal(true);
  };

  const openEditForm = (habit) => {
    setMode(EDIT);
    setEditingHabit(habit);
    setShowModal(true);
  };

  const handleSave = (payload) => {
    if (!user?.id) {
      toast.error("User authentication required");
      return;
    }

    if (mode === CREATE) {
      createHabit(
        { payload, userId: user.id },
        {
          onSuccess: (data) => {
            toast.success("Habit created");
            setShowModal(false);
            if (data?.[0]) setSelectedHabit(data[0]);
          },
          onError: () => toast.error("Could not create habit"),
        },
      );
      return;
    }

    updateHabit(
      {
        payload: { ...editingHabit, ...payload },
        userId: user.id,
      },
      {
        onSuccess: (data) => {
          toast.success("Habit updated");
          setShowModal(false);
          if (data?.[0]) setSelectedHabit(data[0]);
        },
        onError: () => toast.error("Could not update habit"),
      },
    );
  };

  const handleCompleteHabit = (habit) => {
    if (!user?.id) {
      toast.error("User authentication required");
      return;
    }

    archiveHabit(
      { habitId: habit.id, userId: user.id },
      {
        onSuccess: () => {
          toast.success("Habit completed");
          if (selectedHabit?.id === habit.id) setSelectedHabit(null);
          setShowModal(false);
        },
        onError: () => toast.error("Could not complete habit"),
      },
    );
  };

  const handleMarkHabitIncomplete = (habit) => {
    if (!user?.id) {
      toast.error("User authentication required");
      return;
    }

    unarchiveHabit(
      { habitId: habit.id, userId: user.id },
      {
        onSuccess: (data) => {
          toast.success("Habit marked incomplete");
          if (data?.[0]) setSelectedHabit(data[0]);
        },
        onError: () => toast.error("Could not update habit"),
      },
    );
  };

  const handleToggleSelectedDate = (habit) => {
    if (!user?.id) {
      toast.error("User authentication required");
      return;
    }

    if (dayjs(selectedDateKey).isAfter(dayjs(), "day")) return;

    if (!isHabitDueForDate(habit, selectedDateKey)) return;

    const completed = isHabitCompletedForDate(
      habit.id,
      selectedDateEntries,
      selectedDateKey,
    );

    if (completed) {
      uncompleteHabit(
        {
          payload: { habitId: habit.id, entryDate: selectedDateKey },
          userId: user.id,
        },
        {
          onSuccess: () => toast.success("Check-in undone"),
          onError: () => toast.error("Could not update habit"),
        },
      );
      return;
    }

    const progressValue =
      habit.targetType === HABIT_TARGET_TYPES.NUMERIC
        ? Number(habit.targetValue ?? 1)
        : 1;

    completeHabit(
      {
        payload: {
          habitId: habit.id,
          entryDate: selectedDateKey,
          progressValue,
        },
        userId: user.id,
      },
      {
        onSuccess: () => toast.success("Checked in"),
        onError: () => toast.error("Could not update habit"),
      },
    );
  };

  const handleDeleteHabit = () => {
    if (!user?.id || !habitToDelete) return;

    deleteHabit(
      { habitId: habitToDelete.id, userId: user.id },
      {
        onSuccess: () => {
          toast.success("Habit deleted");
          if (selectedHabit?.id === habitToDelete.id) setSelectedHabit(null);
          setHabitToDelete(null);
        },
        onError: () => toast.error("Could not delete habit"),
      },
    );
  };

  return (
    <>
      <div className="hidden h-[calc(100vh-64px)] overflow-hidden md:flex">
        <div className="flex flex-col border-r border-border md:w-72 md:flex-none xl:w-92">
          <HabitList
            showHeader
            selectedHabitId={selectedHabit?.id}
            selectedDateKey={selectedDateKey}
            onSelectedDateChange={setSelectedDateKey}
            onHabitSelect={setSelectedHabit}
            onCreateHabit={openCreateForm}
            onEditHabit={openEditForm}
            onDeleteHabit={setHabitToDelete}
          />
        </div>
        <div className="hidden h-full flex-1 flex-col md:flex">
          <HabitDetailPlaceholder
            habit={selectedHabit}
            onComplete={handleCompleteHabit}
            onToggleDate={handleToggleSelectedDate}
            selectedDateKey={selectedDateKey}
            isCompletedOnSelectedDate={isSelectedHabitDoneOnSelectedDate}
            onEdit={openEditForm}
            onCreateHabit={openCreateForm}
            onDelete={setHabitToDelete}
            onMarkIncomplete={handleMarkHabitIncomplete}
          />
        </div>
      </div>

      <div className="h-[calc(100vh-64px)] overflow-hidden md:hidden">
        {selectedHabit ? (
          <HabitDetailPlaceholder
            habit={selectedHabit}
            onComplete={handleCompleteHabit}
            onToggleDate={handleToggleSelectedDate}
            selectedDateKey={selectedDateKey}
            isCompletedOnSelectedDate={isSelectedHabitDoneOnSelectedDate}
            onEdit={openEditForm}
            onDelete={setHabitToDelete}
            onMarkIncomplete={handleMarkHabitIncomplete}
            onBack={() => setSelectedHabit(null)}
          />
        ) : (
          <HabitList
            showHeader={false}
            selectedHabitId={selectedHabit?.id}
            selectedDateKey={selectedDateKey}
            onSelectedDateChange={setSelectedDateKey}
            onHabitSelect={setSelectedHabit}
            onCreateHabit={openCreateForm}
            onEditHabit={openEditForm}
            onDeleteHabit={setHabitToDelete}
          />
        )}
      </div>

      <HabitForm
        open={showModal}
        onOpenChange={setShowModal}
        mode={mode}
        habit={editingHabit}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <ResponsiveDialog
        open={!!habitToDelete}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setHabitToDelete(null);
        }}
        title="Delete habit"
        description={null}
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setHabitToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              loading={isDeleting}
              onClick={handleDeleteHabit}
            >
              Delete
            </Button>
          </>
        }
      >
        {habitToDelete && (
          <p className="text-sm text-muted-foreground">
            Removing the habit{" "}
            <strong className="mx-1 font-semibold text-foreground">
              {habitToDelete.name}
            </strong>{" "}
            will delete all its completion history.
            <br />
            Are you sure you want to delete?
          </p>
        )}
      </ResponsiveDialog>
    </>
  );
};

export default Habits;
