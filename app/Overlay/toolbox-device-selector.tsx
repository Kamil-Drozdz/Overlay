import { Laptop, Phone } from "lucide-react";

const devices = ["Phone", "Laptop"];

const ToolboxDeviceSelector: React.FC<{
  onDeviceChange: (device: string) => void;
  device: string;
}> = ({ onDeviceChange, device }) => (
  <div className="flex justify-center gap-4 mb-4">
    {devices.map((deviceName) => (
      <button
        key={deviceName}
        onClick={() => onDeviceChange(deviceName)}
        className={`hover:bg-gray-700 p-1 bg-gray-500 rounded ${
          deviceName === device ? "text-white" : "text-gray-400"
        }`}
      >
        {deviceName === devices[0] ? <Phone /> : <Laptop />}
      </button>
    ))}
  </div>
);

export default ToolboxDeviceSelector;
