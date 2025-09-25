
import { create } from "zustand";
import { generarCeldas, marcarOcupadas } from "../lib/cellUtils";

export type EstadoCelda = "ocupado" | "disponible" | "asignado";

export interface Celda {
  id: string;
  fila: number;
  columna: number;
  estado: EstadoCelda;
}

interface CellStore {
  celdas: Celda[];
  generarGrid: (filas: number, columnas: number) => void;
  setOcupadas: (ocupadas: { fila: number; columna: number }[]) => void;
  actualizarEstado: (id: string, estado: EstadoCelda) => void;
}

export const useCellStore = create<CellStore>((set, get) => ({
  celdas: [],

  // Genera toda la grilla disponible
  generarGrid: (filas, columnas) => {
    const celdas = generarCeldas(filas, columnas);
    set({ celdas });
  },

  // Marca ocupadas según data externa (mina real)
  setOcupadas: (ocupadas) => {
    const celdas = marcarOcupadas(get().celdas, ocupadas);
    set({ celdas });
  },

  // Permite actualizar estado individual (ej. asignar/ocupar)
  actualizarEstado: (id, estado) => {
    const celdas = get().celdas.map((celda) =>
      celda.id === id ? { ...celda, estado } : celda
    );
    set({ celdas });
  },
}));

