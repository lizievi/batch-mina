export interface SackProps {
  id: string;
  idLot: string;
  name: number;
  state: string;
  idCell?: string;
}
export interface LotProps {
  id: string;
  name: string;
  start: number;
  end: number;
  sacks: SackProps[];
}
export interface LotStoreProps {
  stateLots: LotProps[];
  setLots: (lots: LotProps[]) => void;
  assignLots: (lotId: string, sack: LotProps["sacks"][number]) => void;
}
