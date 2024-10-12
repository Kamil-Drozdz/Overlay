import { WidgetProps } from "./widget-schema";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  MutableRefObject,
} from "react";
import { useDrop } from "react-dnd";
import { WidgetExtended } from "./overlay-configurator";
import useMousePosition from "./useMousePosition";
import OverlayPreviewItem from "./overlay-preview-item";

const dimensionPhone = {
  width: 480,
  height: 854,
};
const dimensionLaptop = {
  width: 1920,
  height: 1080,
};

interface OverlayPreviewProps {
  config: {
    backgroundImageUrl: string;
    dimensions: { width: number; height: number };
  };
  widgets: WidgetExtended[];

  updateWidgetPositionAndSize: (
    id: string,
    updates: Partial<WidgetExtended>
  ) => void;
  editingWidgetId: string | null;
  device: string;
}

const OverlayPreview: React.FC<OverlayPreviewProps> = ({
  config,
  widgets,
  updateWidgetPositionAndSize,
  editingWidgetId,
  device,
}) => {
  const [dimensions, setDimensions] = useState({
    width: config.dimensions.width,
    height: config.dimensions.height,
  });
  const containerRef: MutableRefObject<HTMLUListElement | null> = useRef(null);
  const { mousePosition, updateMousePosition } = useMousePosition(containerRef);

  const [, drop] = useDrop(
    () => ({
      accept: "WIDGET",
      hover: (item: WidgetExtended, monitor) => {
        const clientOffset = monitor.getClientOffset();
        if (clientOffset && containerRef.current) {
          updateMousePosition({
            clientX: clientOffset.x,
            clientY: clientOffset.y,
          } as MouseEvent);
        }
      },
      drop: (item: WidgetExtended, monitor) => {
        if (mousePosition && containerRef.current) {
          updateWidgetPositionAndSize(item.id, {
            x: mousePosition.x,
            y: mousePosition.y,
            isDropped: true,
          });
        }
      },
    }),
    [mousePosition, updateMousePosition, updateWidgetPositionAndSize]
  );

  const prevDimensionsRef = useRef(dimensions);

  const adjustWidgetPosition = useCallback(
    (widget: WidgetProps) => {
      let newX = Math.min(
        Math.max(0, widget.x),
        dimensions.width - widget.width
      );
      let newY = Math.min(
        Math.max(0, widget.y),
        dimensions.height - widget.height - 20
      );
      let newWidth = widget.width;
      let newHeight = widget.height;
      if (widget.width > dimensions.width) {
        newWidth = dimensions.width;
      }
      if (widget.height > dimensions.height) {
        newHeight = dimensions.height;
      }

      if (newY < 0 || newY > dimensions.height - newHeight) {
        console.error("Błąd: nowa pozycja Y jest poza dozwolonym zakresem.");
      }

      if (newX !== widget.x || newY !== widget.y) {
        updateWidgetPositionAndSize(widget.id, {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        });
      }
    },
    [dimensions, updateWidgetPositionAndSize, device]
  );

  useEffect(() => {
    let newDimensions;
    if (device === "Phone") {
      newDimensions = dimensionPhone;
    } else {
      newDimensions = dimensionLaptop;
    }

    if (
      newDimensions.width !== prevDimensionsRef.current.width ||
      newDimensions.height !== prevDimensionsRef.current.height
    ) {
      setDimensions(newDimensions);
      prevDimensionsRef.current = newDimensions;
    }
    setTimeout(() => {
      widgets.forEach(adjustWidgetPosition);
    }, 0);
  }, [device, widgets, adjustWidgetPosition]);

  const scale = dimensions.width > 1000 ? 0.6 : 1;
  const multiplier = 1 / scale;

  // TODO: dodać skalowanie do wymiarów wyjsciowych
  // const newX = x * multiplier;
  // const newY = y * multiplier;

  return (
    <div className="w-full flex flex-col justify-center items-center relative overflow-hidden bg-gray-700">
      <div className="flex text-black text-sm space-x-1 justify-center items-center">
        <h1 className="text-white text-3xl font-bold text-center shadow-lg">
          Podgląd nakładki
        </h1>
        <input
          className="bg-white p-1 rounded-md w-12 h-6"
          type="text"
          value={dimensions.width}
          onChange={(e) =>
            setDimensions({ ...dimensions, width: parseInt(e.target.value) })
          }
        />
        <span> x</span>
        <input
          className="bg-white p-1 rounded-md w-12 h-6"
          type="text"
          value={dimensions.height}
          onChange={(e) =>
            setDimensions({ ...dimensions, height: parseInt(e.target.value) })
          }
        />
      </div>
      <ul
        ref={(node) => {
          drop(node);
          if (containerRef.current !== node) {
            containerRef.current = node;
          }
        }}
        style={{
          width: dimensions.width * scale,
          height: dimensions.height * scale,
          borderRadius: "15px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        {widgets
          .filter((widget) => widget.isDropped)
          .map((widget) => (
            <OverlayPreviewItem
              key={widget.id}
              widget={widget}
              updateWidgetPositionAndSize={updateWidgetPositionAndSize}
              editingWidgetId={editingWidgetId}
            />
          ))}
      </ul>
    </div>
  );
};

export default OverlayPreview;
