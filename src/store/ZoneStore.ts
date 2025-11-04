import { z } from "zod";
import { v4 as uuid } from "uuid";
import { generarCeldas } from "../lib/cellUtils"; 
import type { Celda } from "./CellStore";


export const zonaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  filas: z.number(),
  columnas: z.number(),
  celdas: z.array(z.any()),
});

export type ZonaType = z.infer<typeof zonaSchema>;

const crearZona = (nombre: string, filas: number, columnas: number): ZonaType => ({
  id: uuid(),
  nombre,
  filas,
  columnas,
  celdas: generarCeldas(filas, columnas) as Celda[],
});

export const zonasData: Record<string, ZonaType[]> = {
  A: [
    crearZona("Zona A1", 5, 3),
    crearZona("Zona A2", 4, 3),
    crearZona("Zona A3", 5, 4),
  ],
  B: [
    crearZona("Zona B1", 6, 3),
    crearZona("Zona B2", 4, 5),
  ],
  C: [
    crearZona("Zona C1", 7, 4),
    crearZona("Zona C2", 6, 3),
    crearZona("Zona C3", 2, 3),
    crearZona("Zona C4", 2, 5),
  ],
};

