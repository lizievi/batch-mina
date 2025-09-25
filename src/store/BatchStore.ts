
import { create } from "zustand";
import { v4 as uuid } from "uuid";

export type SackState = "asigned" | "no_asigned";
interface SackType {
  id: string;
  estate: SackState;
}
interface DetailedSackType {
  id: string;
  code: string;
  peso: number;
  mineral: string;
  estate: SackState;
}
interface LoteType {
  id: string;
  loteName: string; 
  available: number; 
  sacos?: DetailedSackType; 
  sacks: SackType[]; 
}
interface BatchStateType {
  lotes: LoteType[];
}

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
