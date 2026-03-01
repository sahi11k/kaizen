import React, { useState } from "react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskItem from "@/features/pomodoro/components/Tasks/TaskItem";
import { CREATE } from "@/shared/constants";

const SortableContainer = ({ tasks, children, onDragEnd, currentTask }) => {
  const [activeTask, setActiveTask] = useState(null);
  const items = tasks.map((task) => task.id);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const updatedTasks = (items) => {
        const oldIndex = items.findIndex((task) => task.id === active.id);
        const newIndex = items.findIndex((task) => task.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      };

      onDragEnd(updatedTasks(tasks));
    }
    setActiveTask(null);
  };

  const handleDragStart = (event) => {
    const activeTask = tasks.find((task) => task.id === event.active.id);
    setActiveTask(activeTask);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      <DragOverlay>
        {activeTask ? (
          <TaskItem
            task={activeTask}
            onComplete={DUMMY_FN}
            onEdit={DUMMY_FN}
            onRemove={DUMMY_FN}
            isActive={currentTask?.id === activeTask?.id}
            mode={CREATE}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const DUMMY_FN = () => {};

export default SortableContainer;
