"use server";

// import { db } from "@/db/db";
// import { widgets } from "@/db/schema";
import { WidgetProps } from "./widget-schema";

export async function saveWidget(data: WidgetProps, streamerId: string) {
  try {
    // Dodanie widgeta do bazy z relacją do streamera
    // await db.insert(widgets).values({ ...data, streamerId });
    // console.log("Widget zapisany pomyślnie");
    return { success: true };
  } catch (error) {
    console.error("Błąd podczas zapisywania widgetu:", error);
    return { success: false, error: "Nie udało się zapisać widgetu" };
  }
}
