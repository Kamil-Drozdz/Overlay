import React, { useState } from "react";
import { WidgetProps } from "./widget-schema";

import { v4 as uuidv4 } from "uuid";
import ToolboxItem from "./toolbox-item";
import ToolboxDeviceSelector from "./toolbox-device-selector";

interface ToolboxProps {
  onAddWidget: (widgetType: string) => void;
  widgets: WidgetProps[];
  onEditWidget: (widget: WidgetProps) => void;
  onRemoveWidget: (widgetId: string) => void;
  editingWidgetId: string | null;
  onDeviceChange: (device: string) => void;
  device: string;
}

const Toolbox: React.FC<ToolboxProps> = ({
  onAddWidget,
  widgets,
  onEditWidget,
  onRemoveWidget,
  editingWidgetId,
  onDeviceChange,
  device,
}) => {
  return (
    <div className="w-64 p-4 bg-gray-800">
      <div className="flex flex gap-4 justify-center items-center">
        <h2 className="text-xl font-bold mb-4 text-white">Toolbox</h2>
        <ToolboxDeviceSelector
          device={device}
          onDeviceChange={onDeviceChange}
        />
      </div>
      <ul className="grid grid-cols-1 gap-4">
        {widgets.map((widget) => (
          <ToolboxItem
            key={widget.id}
            widget={widget}
            onEdit={() => onEditWidget(widget)}
            onRemove={() => onRemoveWidget(widget.id)}
            isEditing={editingWidgetId === widget.id}
          />
        ))}
      </ul>
      <button
        onClick={() => onAddWidget(uuidv4())}
        className="w-full text-left hover:bg-gray-200 p-2 rounded bg-gray-500 mt-4"
      >
        Dodaj nowy widget
      </button>
    </div>
  );
};
export default Toolbox;
