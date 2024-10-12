import { z } from "zod";

export const settingsSchema = z.object({
  label: z.string(),
  name: z.string(),
  donors: z.array(
    z.object({
      name: z.string().min(1),
      amount: z.number().min(0),
    })
  ),
  backgroundImageUrl: z.string(),
  textColor: z.string().min(1),
  fontSize: z.string().min(1),
});

export const widgetSchema = z.object({
  id: z.string(),
  settings: settingsSchema,
  x: z.number().min(0),
  y: z.number().min(0),
  width: z.number().min(100),
  height: z.number().min(100),
});

export type WidgetSettings = z.infer<typeof widgetSchema>;
export type WidgetProps = z.infer<typeof widgetSchema>;
