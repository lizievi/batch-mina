import { useLoteStore } from "@/store/LoteStore";
import { useCellStore, type Celda, type EstadoCelda } from "../store/CellStore";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

interface GridProps {
  columnas: number;
  celdas: Celda[];
}

export default function Grid({ columnas, celdas }: GridProps) {
  const { id } = useParams();

  const { lotes, updateSacosByIdLote } = useLoteStore();
  const lote = useMemo(() => lotes.find((item) => item.id === id), [lotes, id]);

  const { actualizarCeldas } = useCellStore();

  const handleDelete = (idCelda: string) => {
    let idSaco = null;
    const celdasRestauradas = celdas.map((celda) => {
      if (celda.id === idCelda) {
        idSaco = celda.saco?.id;
        console.log("idSaco", idSaco);
        if (lote) {
          const { sacos } = lote;
          const sacosActualizados = sacos.map((sacoStore) => {
            if(sacoStore.id === idSaco){
              
              return {...celda.saco, estado: 'no_asigned'}
            }
            return sacoStore;
          });
        updateSacosByIdLote(lote.id, sacosActualizados);
        }

        return { ...celda, estado: "disponible" as EstadoCelda, saco: null };
      }
      // del saco ya tenemos su id
      return celda;
    });

    actualizarCeldas(celdasRestauradas);
  };
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columnas}, 1fr)` }}
    >
      {celdas.map((celda) => (
        <div
          key={celda.id}
          className={`h-16 flex items-center justify-center border rounded ${
            celda.estado === "ocupado"
              ? "bg-red-300"
              : celda.estado === "asignado"
              ? "bg-yellow-300"
              : "bg-green-200"
          }`}
        >
          {celda.saco?.nombre}
          {celda.estado === "ocupado" && (
            <button
              onClick={() => handleDelete(celda.id)}
              className="border border-gray-500 rounded"
            >
              e
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
