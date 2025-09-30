"use client";

import { useLoteStore } from "@/store/LoteStore";
import { useNavigate } from "react-router-dom";
export function DataTable() {
  const lotes = useLoteStore((state) => state.lotes);
  const navigate = useNavigate();
  const handleAssign = (loteId: string) => {
    navigate(`/asignar/${loteId}`);
  };

  return (
    <div className="overflow-hidden rounded-md border max-w-2xl mx-auto">
      <h1>Asignación de Sacos</h1>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Lote</th>
            <th className="border px-4 py-2 text-left">Disponibles</th>
            <th className="border px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lotes.map((lote) => {
            const disponibles = lote.sacos.filter(
              (s) => s.estado === "no_asigned"
            ).length;

            return (
              <tr key={lote.id}>
                <td className="border px-4 py-2">{lote.nombre}</td>
                <td className="border px-4 py-2">{disponibles}</td>
                <td className="border px-4 py-2 flex gap-2 items-center">
                  <button
                    onClick={() => handleAssign(lote.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Asignar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
