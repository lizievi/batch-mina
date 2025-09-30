import { create } from "zustand";
import { v4 as uuid } from "uuid";

/** Tipos */
export type Saco = {
  id: string;
  estado: string;
  // estado: "asigned" | "no_asigned";
  nombre: string; // ej. "1001"
};

export type Lote = {
  id: string;
  nombre: string; // ej. "1001-1010"
  sacos: Saco[];
};

interface LoteStore {
  lotes: Lote[];
  // assignSacos: (loteId: string, cantidad: number) => void;
  generarLotesDemo?: () => void;
}

/** Función para generar sacos según rango */
const generarSacos = (inicio: number, fin: number): Saco[] =>
  Array.from({ length: fin - inicio + 1 }).map((_, i) => ({
    id: uuid(),
    estado: "no_asigned",
    nombre: `${inicio + i}`, // Ej: 1001, 1002, 1003...
  }));

/** Función para crear un lote a partir de rango */
const crearLote = (inicio: number, fin: number): Lote => ({
  id: uuid(),
  nombre: `${inicio}-${fin}`,
  sacos: generarSacos(inicio, fin),
});

/** Store */
export const useLoteStore = create<LoteStore>((set) => ({
  lotes: [crearLote(1001, 1010), crearLote(1011, 1020), crearLote(1021, 1030)],

  assignSacos: (loteId: string, nuevosSacos: Saco[]) =>
    set((state) => ({
      lotes: state.lotes.map((lote) =>
        lote.id === loteId
          ? { ...lote, sacos: nuevosSacos } // reemplaza sacos
          : lote
      ),
    })),
}));
