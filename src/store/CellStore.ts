import { create } from "zustand";
import type { ZonaType } from "./ZoneStore";

export type EstadoCelda = "ocupado" | "disponible" | "asignado";

export interface Celda {
  id: string;
  fila: number;
  columna: number;
  estado: EstadoCelda;
}

interface CellStore {
  celdas: Celda[];
  setZonaCeldas: (zona: ZonaType) => void;
  actualizarEstado: (celdaId: string, nuevoEstado: EstadoCelda) => void;
}

export const useCellStore = create<CellStore>((set) => ({
  celdas: [],

  // Cargar las celdas de la zona seleccionada
  setZonaCeldas: (zona) => {
    set({ celdas: zona.celdas });
  },

  // Actualizar el estado de una celda concreta
  actualizarEstado: (celdaId, nuevoEstado) => {
    set((state) => ({
      celdas: state.celdas.map((celda) =>
        celda.id === celdaId ? { ...celda, estado: nuevoEstado } : celda
      ),
    }));
  },
}));
