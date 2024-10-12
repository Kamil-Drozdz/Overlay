import { Cog, MonitorStop } from "lucide-react";
import { Trash } from "lucide-react";
import { WidgetExtended } from "./overlay-configurator";
import { useDrag } from "react-dnd";

const ToolboxItem: React.FC<{
  widget: WidgetExtended;
  onEdit: () => void;
  onRemove: () => void;
  isEditing: boolean;
}> = ({ widget, onEdit, onRemove, isEditing }) => {
  const [drag] = useDrag(() => ({
    type: "WIDGET",
    item: widget,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: !widget.isDropped,
  }));

  return (
    <li
      ref={drag as unknown as React.LegacyRef<HTMLLIElement>}
      className={`flex items-center justify-between border p-1 text-white hover:bg-gray-600 bg-gray-700 rounded-lg shadow-md transition duration-200  ${
        isEditing ? "bg-blue-300" : ""
      } 
      ${widget.isDropped ? "border-blue-500" : ""}`}
    >
      <div className="flex flex-col items-center gap-2">
        <MonitorStop className="text-gray-400" />
        <span className="text-sm">{widget.settings.label || "Brak nazwy"}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className={`hover:bg-gray-700 p-1 rounded`}
          aria-label={isEditing ? "Zakończ edytowanie" : "Edytuj"}
        >
          <Cog className="text-gray-400" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-red-600 p-1 rounded"
        >
          <Trash className="text-gray-400" />
        </button>
      </div>
    </li>
  );
};
export default ToolboxItem;
