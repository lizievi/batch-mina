// // CellStore.ts
// import { v4 as uuid } from "uuid";

// // types
// export type EstadoCelda = "ocupado" | "disponible" | "asignado";

// export type Celda = {
//   id: string;
//   fila: number;
//   columna: number;
//   estado: EstadoCelda;
// };

// // Datos estáticos: grilla 4x3 (12 celdas)
// export const cellStore: Celda[] = [
//   { id: uuid(), fila: 1, columna: 1, estado: "ocupado" },
//   { id: uuid(), fila: 1, columna: 2, estado: "ocupado" },
//   { id: uuid(), fila: 1, columna: 3, estado: "disponible" },

//   { id: uuid(), fila: 2, columna: 1, estado: "disponible" },
//   { id: uuid(), fila: 2, columna: 2, estado: "disponible" },
//   { id: uuid(), fila: 2, columna: 3, estado: "disponible" },

//   { id: uuid(), fila: 3, columna: 1, estado: "disponible" },
//   { id: uuid(), fila: 3, columna: 2, estado: "disponible" },
//   { id: uuid(), fila: 3, columna: 3, estado: "disponible" },

//   { id: uuid(), fila: 4, columna: 1, estado: "disponible" },
//   { id: uuid(), fila: 4, columna: 2, estado: "disponible" },
//   { id: uuid(), fila: 4, columna: 3, estado: "disponible" },
// ];

// store/CellStore.ts
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

