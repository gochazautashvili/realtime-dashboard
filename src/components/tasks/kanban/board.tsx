import { ReactNode } from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export const KanbanBoardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        width: "calc(100% + 64px)",
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "column",
        margin: "-32px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "32px",
          overflow: "scroll",
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface Props {
  children: ReactNode;
  onDragEnd: (e: DragEndEvent) => void;
}

export const KanbanBoard = ({ children, onDragEnd }: Props) => {
  const mouseSensors = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const touchSensors = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensors, touchSensors);

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
};
