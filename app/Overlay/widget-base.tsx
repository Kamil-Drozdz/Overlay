import React from "react";

interface WidgetBaseProps {
  name: string;
  donors: { name: string; amount: number }[];
  fontSize: string;
}

const WidgetBase: React.FC<WidgetBaseProps> = ({ name, donors, fontSize }) => {
  return (
    <div>
      <h3 className="font-bold mb-2 w-full text-center" style={{ fontSize }}>
        {name}
      </h3>
      <ul>
        {donors.map((donor, index) => (
          <li key={index} className="flex justify-between">
            <span>{donor.name}</span>
            <span>{donor.amount} zł</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetBase;
