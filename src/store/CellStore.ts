import { create } from "zustand";
import type { ZonaType } from "./ZoneStore";
import type { Saco } from "./LoteStore";

export type EstadoCelda = "ocupado" | "disponible" | "asignado";

export interface Celda {
  saco: Saco | null;
  estado:  EstadoCelda;
  posicion: number;
  id: string;
  fila: number;
  columna: number;
}

type CellStore = {
  celdas: Celda[];
  setZonaCeldas: (zona: ZonaType) => void;
  actualizarEstado: (celdaId: string, nuevoEstado: EstadoCelda) => void;
  actualizarCeldas: (celdas: Celda[]) => void;
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

  actualizarCeldas: (celdas) => {
    set({ celdas: celdas });
  },
}));
