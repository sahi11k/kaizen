import React, { useMemo, useState } from "react";

import {
  DndContext,
  closestCenter,
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
import TaskItem from "@/features/pomodoro/components/TaskList/ListItem";

const SortableContainer = ({ tasks, children, onDragEnd, currentTask }) => {
  const [activeTask, setActiveTask] = useState(null);
  const items = useMemo(() => tasks.map((task) => task.id), [tasks]);

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
            onComplete={noop}
            onEdit={noop}
            onRemove={noop}
            isActive={currentTask?.id === activeTask?.id}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const noop = () => {};

export default SortableContainer;
