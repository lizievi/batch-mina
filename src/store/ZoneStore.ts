// src/store/ZoneStore.ts
import { z } from "zod";
import { v4 as uuid } from "uuid";

// 🔹 Definición con Zod
export const zonaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
});

export type ZonaType = z.infer<typeof zonaSchema>;

// ✅ Zonas agrupadas por patio
export const zonasData: Record<string, ZonaType[]> = {
  A: [
    { id: uuid(), nombre: "Zona A1" },
    { id: uuid(), nombre: "Zona A2" },
    { id: uuid(), nombre: "Zona A3" },
  ],
  B: [
    { id: uuid(), nombre: "Zona B1" },
    { id: uuid(), nombre: "Zona B2" },
  ],
  C: [
    { id: uuid(), nombre: "Zona C1" },
    { id: uuid(), nombre: "Zona C2" },
    { id: uuid(), nombre: "Zona C3" },
    { id: uuid(), nombre: "Zona C4" },
  ],
};
