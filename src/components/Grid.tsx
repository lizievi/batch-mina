import { useCellStore, type Celda, type EstadoCelda } from "../store/CellStore";

interface GridProps {
  columnas: number;
  celdas: Celda[];
}

export default function Grid({ columnas, celdas }: GridProps) {
  const { actualizarCeldas } = useCellStore();

  console.log("celdas", celdas);
  const handleDelete = (idCelda: string) => {
    const celdasRestauradas = celdas.map((celda) => {
      if (celda.id === idCelda) {
        return { ...celda, estado: "disponible" as EstadoCelda, saco: null };
      }
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
