
import { create } from "zustand";
import { v4 as uuid } from "uuid";

// Estado posible de un saco
export type SackState = "asigned" | "no_asigned";

// 🔹 Tipo de un saco "simple" (en el array sacks)
interface SackType {
  id: string;
  estate: SackState;
}

// 🔹 Tipo de un saco "detallado" (sacos)
interface DetailedSackType {
  id: string;
  code: string;
  peso: number;
  mineral: string;
  estate: SackState;
}

// 🔹 Lote
interface LoteType {
  id: string;
  loteName: string; // ej: "1001-1010"
  available: number; // cantidad de sacos libres para asignar
  sacos?: DetailedSackType; // ✅ el nuevo objeto adicional (opcional si algunos lotes no lo tienen)
  sacks: SackType[]; // array de 10 sacos simples
}

// 🔹 Estado global
interface BatchStateType {
  lotes: LoteType[];
}

// ✅ Store de Zustand
export const useBatchStore = create<BatchStateType>(() => ({
  lotes: [
    {
      id: uuid(),
      loteName: "1001-1010",
      available: 5,
      sacos: {
        id: uuid(),
        code: "1001",
        peso: 10,
        mineral: "hierro",
        estate: "asigned",
      },
      sacks: Array.from({ length: 10 }).map(() => ({
        id: uuid(),
        estate: "no_asigned",
      })),
    },
    {
      id: uuid(),
      loteName: "1011-1020",
      available: 3,
      sacks: Array.from({ length: 10 }).map(() => ({
        id: uuid(),
        estate: "no_asigned",
      })),
    },
    {
      id: uuid(),
      loteName: "1021-1030",
      available: 7,
      sacks: Array.from({ length: 10 }).map(() => ({
        id: uuid(),
        estate: "no_asigned",
      })),
    },
  ],
}));
