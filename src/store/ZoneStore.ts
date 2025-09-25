// src/store/ZoneStore.ts
import { z } from "zod";
import { v4 as uuid } from "uuid";
// import type { columns } from "@/app/payments/columns";

export const zonaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  filas: z.number(),
  columnas: z.number(),
});

export type ZonaType = z.infer<typeof zonaSchema>;

export const zonasData: Record<string, ZonaType[]> = {
  A: [
    { id: uuid(), nombre: "Zona A1", filas: 5, columnas: 3 },
    { id: uuid(), nombre: "Zona A2", filas: 4, columnas: 3 },
    { id: uuid(), nombre: "Zona A3", filas: 5, columnas: 4 },
  ],
  B: [
    { id: uuid(), nombre: "Zona B1", filas: 6, columnas: 3 },
    { id: uuid(), nombre: "Zona B2", filas: 4, columnas: 5 },
  ],
  C: [
    { id: uuid(), nombre: "Zona C1", filas: 7, columnas: 4 },
    { id: uuid(), nombre: "Zona C2", filas: 6, columnas: 3 },
    { id: uuid(), nombre: "Zona C3", filas: 2, columnas: 3 },
    { id: uuid(), nombre: "Zona C4", filas: 2, columnas: 5 },
  ],
};


