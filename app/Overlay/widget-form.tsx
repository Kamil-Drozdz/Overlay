import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import { saveWidget } from "./save-widget";
import { WidgetProps, widgetSchema } from "./widget-schema";

interface WidgetFormProps {
  widget?: WidgetProps;
  onSubmit: (data: WidgetProps) => void;
}

const WidgetForm: React.FC<WidgetFormProps> = ({ widget, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WidgetProps>({
    resolver: zodResolver(widgetSchema),
    mode: "onChange",
    defaultValues: widget,
  });

  useEffect(() => {
    reset(widget);
  }, [widget]);

  const onSubmitForm = async (data: WidgetProps) => {
    try {
      // await saveWidget(data, "tede");
      onSubmit(data);
    } catch (error) {
      console.error("Błąd podczas zapisywania widgetu:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-3 bg-gray-800 p-2 rounded-md absolute top-0  right-0 h-full"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300"
        >
          Nazwa widgeta
        </label>
        <input
          {...register("settings.label")}
          id="name"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.settings?.label && (
          <p className="mt-1 text-sm text-red-600">
            {errors.settings.label.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300"
        >
          Nazwa na overlayu
        </label>
        <input
          {...register("settings.name")}
          id="name"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.settings?.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.settings.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="backgroundColor"
          className="block text-sm font-medium text-gray-300"
        >
          URL do obrazu tła
        </label>
        <input
          {...register("settings.backgroundImageUrl")}
          id="backgroundImageUrl"
          placeholder="https://example.com/image.jpg"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.settings?.backgroundImageUrl && (
          <p className="mt-1 text-sm text-red-600">
            {errors.settings.backgroundImageUrl.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="textColor"
          className="block text-sm font-medium text-gray-300"
        >
          Kolor tekstu
        </label>
        <input
          {...register("settings.textColor")}
          id="textColor"
          type="color"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.settings?.textColor && (
          <p className="mt-1 text-sm text-red-600">
            {errors.settings?.textColor?.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="fontSize"
          className="block text-sm font-medium text-gray-300"
        >
          Rozmiar czcionki
        </label>
        <input
          {...register("settings.fontSize")}
          id="fontSize"
          placeholder="np. 16px"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.settings?.fontSize && (
          <p className="mt-1 text-sm text-red-600">
            {errors.settings?.fontSize?.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="x" className="block text-sm font-medium text-gray-300">
          Pozycja X
        </label>
        <input
          {...register("x", { valueAsNumber: true })}
          id="x"
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.x && (
          <p className="mt-1 text-sm text-red-600">{errors.x.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="y" className="block text-sm font-medium text-gray-300">
          Pozycja Y
        </label>
        <input
          {...register("y", { valueAsNumber: true })}
          id="y"
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.y && (
          <p className="mt-1 text-sm text-red-600">{errors.y.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="width"
          className="block text-sm font-medium text-gray-300"
        >
          Szerokość
        </label>
        <input
          {...register("width", { valueAsNumber: true })}
          id="width"
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.width && (
          <p className="mt-1 text-sm text-red-600">{errors.width.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="height"
          className="block text-sm font-medium text-gray-300"
        >
          Wysokość
        </label>
        <input
          {...register("height", { valueAsNumber: true })}
          id="height"
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
        />
        {errors.height && (
          <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Zapisz widget
      </button>
    </form>
  );
};

export default WidgetForm;
