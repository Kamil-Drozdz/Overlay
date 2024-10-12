"use client";
import React, { useState, useEffect } from "react";
import OwnerComponent from "./owner-component";

import OverlayPreview from "./overlay-preview";
import { WidgetProps } from "./widget-schema";
import WidgetForm from "./widget-form";
import Toolbox from "./toolbox";
import { v4 as uuidv4 } from "uuid";

export type WidgetExtended = WidgetProps & { isDropped?: boolean };

const OverlayConfigurator: React.FC = () => {
  const [editingWidget, setEditingWidget] = useState<WidgetExtended | null>(
    null
  );
  const [device, setDevice] = useState<string>("Laptop");

  const [widgets, setWidgets] = useState<WidgetExtended[]>([
    {
      id: uuidv4(),
      isDropped: false,
      settings: {
        label: "Nowy Widget",
        name: "Nowy Widget",
        donors: [],
        backgroundImageUrl: "url/do/tła",
        textColor: "#fff",
        fontSize: "16px",
      },
      x: 0,
      y: 0,
      width: 200,
      height: 150,
    },
  ]);

  useEffect(() => {
    if (editingWidget) {
      const updatedWidget = widgets.find((w) => w.id === editingWidget.id);
      if (updatedWidget) {
        setEditingWidget(updatedWidget);
      }
    }
  }, [widgets, editingWidget]);

  const handleEditWidget = (widget: WidgetExtended) => {
    setEditingWidget(widget);
  };

  const handleUpdateWidget = (updatedData: WidgetExtended) => {
    setWidgets(
      widgets.map((w) =>
        w.id === editingWidget?.id ? { ...w, ...updatedData } : w
      )
    );
  };

  const overlayConfig = {
    backgroundImageUrl: "url/do/tła",
    dimensions: { width: 1920, height: 1080 },
  };

  const addWidget = (widgetTypeId: string) => {
    setWidgets([
      ...widgets,
      {
        id: widgetTypeId,
        isDropped: false,
        settings: {
          label: "Nowy Widget",
          name: "Nowy Widget",
          donors: [],
          backgroundImageUrl: "https://i.ibb.co/GQMWT2n/image.png",
          textColor: "#fff",
          fontSize: "16px",
        },
        x: 0,
        y: 0,
        width: 200,
        height: 150,
      },
    ]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
    if (editingWidget && editingWidget.id === id) {
      setEditingWidget(null);
    }
  };

  const updateWidgetPositionAndSize = (
    id: string,
    updates: Partial<WidgetExtended>
  ) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, ...updates } : widget
      )
    );
    if (editingWidget && editingWidget.id === id) {
      setEditingWidget((prev) => {
        if (prev) {
          return { ...prev, ...updates };
        }
        return null;
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <OwnerComponent>
        <Toolbox
          onAddWidget={addWidget}
          widgets={widgets}
          editingWidgetId={editingWidget?.id || null}
          onEditWidget={handleEditWidget}
          onRemoveWidget={removeWidget}
          onDeviceChange={setDevice}
          device={device}
        />
        <OverlayPreview
          config={overlayConfig}
          widgets={widgets}
          editingWidgetId={editingWidget?.id || null}
          updateWidgetPositionAndSize={updateWidgetPositionAndSize}
          device={device}
        />

        {editingWidget && (
          <WidgetForm widget={editingWidget} onSubmit={handleUpdateWidget} />
        )}
      </OwnerComponent>
    </div>
  );
};

export default OverlayConfigurator;
