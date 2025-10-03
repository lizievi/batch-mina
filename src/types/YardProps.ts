import { type SackProps } from "./LotProps";
interface Cell {
  id: string;
  idZone: string;
  position: number;
  state: string; //assigned | available | busy
  sack?: SackProps;
}
interface Zone {
  id: string;
  idYard: string;
  name: string;
  rows: number;
  columns: number;
  cell: Cell[];
}
export interface YardProps {
  id: string;
  name: string;
  zone: Zone[];
}

export interface YardStoreProps {
  stateYard: YardProps[];
  setYard: (yards: YardProps[]) => void;
  ocupyCell?: (cells: Cell) => void;
}