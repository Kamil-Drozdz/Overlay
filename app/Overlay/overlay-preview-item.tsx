import { Rnd } from "react-rnd";
import WidgetBase from "./widget-base";
import { WidgetExtended } from "./overlay-configurator";

const minWidth = 100;
const minHeight = 100;

function OverlayPreviewItem({
  widget,
  editingWidgetId,
  updateWidgetPositionAndSize,
}: {
  widget: WidgetExtended;
  editingWidgetId: string | null;
  updateWidgetPositionAndSize: (
    id: string,
    updates: Partial<WidgetExtended>
  ) => void;
}) {
  return (
    <Rnd
      className={`border border-dotted border-white rounded-lg ${
        editingWidgetId === widget.id ? "border-red-500 " : ""
      }`}
      style={{
        backgroundImage: `url(${widget.settings.backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: widget.settings.textColor,
        fontSize: widget.settings.fontSize,
      }}
      key={widget.id}
      size={{ width: widget.width, height: widget.height }}
      position={{
        x: Math.round(widget.x),
        y: Math.round(widget.y),
      }}
      onDrag={(e, d) => {
        updateWidgetPositionAndSize(widget.id, {
          x: Math.round(d.x),
          y: Math.round(d.y),
        });
      }}
      onResize={(e, direction, ref, delta, position) => {
        const newWidth = Math.max(
          minWidth,
          Math.round(parseFloat(ref.style.width))
        );
        const newHeight = Math.max(
          minHeight,
          Math.round(parseFloat(ref.style.height))
        );

        updateWidgetPositionAndSize(widget.id, {
          width: newWidth,
          height: newHeight,
          x: Math.round(position.x),
          y: Math.round(position.y),
        });
      }}
      bounds="parent"
    >
      <WidgetBase {...widget.settings} />
    </Rnd>
  );
}

export default OverlayPreviewItem;
