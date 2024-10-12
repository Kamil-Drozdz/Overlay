import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface OwnerComponentProps {
  children: React.ReactNode;
}

const OwnerComponent: React.FC<OwnerComponentProps> = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-1">{children}</div>
    </DndProvider>
  );
};

export default OwnerComponent;
