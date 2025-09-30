import { create } from "zustand";
import { v4 as uuid } from "uuid";

export type Saco = {
  id: string;
  estado: string | undefined;
  nombre: string | undefined;
};

export type Lote = {
  id: string;
  nombre: string; // "1001-1010"...
  sacos: Saco[];
};
interface LoteStore {
  lotes: Lote[];
  generarLotesDemo?: () => void;
  assignSacos: (loteId: string, nuevosSacos: Saco[]) => void;
}

// Generar sacos según rango
const generarSacos = (inicio: number, fin: number): Saco[] =>
  Array.from({ length: fin - inicio + 1 }).map((_, i) => ({
    id: uuid(),
    estado: "no_asigned",
    nombre: `${inicio + i}`, // 1001, 1002, 1003...
  }));

// Crear un lote a partir de rango
const crearLote = (inicio: number, fin: number): Lote => ({
  id: uuid(),
  nombre: `${inicio}-${fin}`,
  sacos: generarSacos(inicio, fin),
});

// Store
export const useLoteStore = create<LoteStore>((set) => ({
  lotes: [crearLote(1001, 1010), crearLote(1011, 1020), crearLote(1021, 1030)],

  assignSacos: (loteId: string, nuevosSacos: Saco[]) =>
    set((state) => ({
      lotes: state.lotes.map((lote) =>
        lote.id === loteId
          ? {
              ...lote,
              sacos: lote.sacos.map((sacoExistente, index) =>
                nuevosSacos[index] !== undefined
                  ? nuevosSacos[index]
                  : sacoExistente
              ),
            }
          : lote
      ),
    })),
}));
