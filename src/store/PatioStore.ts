import { create } from "zustand";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { zonaSchema, zonasData } from "./ZoneStore";

export const patioSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  area: z.number(),
  ubicacion: z.string(),
  zonas: z.array(zonaSchema),
});

export type PatioType = z.infer<typeof patioSchema>;

interface PatioStateType {
  patios: PatioType[];
}

export const usePatioStore = create<PatioStateType>(() => ({
  patios: [
    {
      id: uuid(),
      nombre: "Patio A",
      area: 500,
      ubicacion: "Norte",
      zonas: zonasData.A,
    },
    {
      id: uuid(),
      nombre: "Patio B",
      area: 400,
      ubicacion: "Sur",
      zonas: zonasData.B,
    },
    {
      id: uuid(),
      nombre: "Patio C",
      area: 600,
      ubicacion: "Este",
      zonas: zonasData.C,
    },
  ],
}));
