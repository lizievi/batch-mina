import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBatchStore } from "../store/BatchStore";
import { usePatioStore } from "../store/PatioStore";
import { useCellStore } from "../store/CellStore";

import Grid from "../components/Grid";
import HeaderAsignacion from "../components/layout/HeaderAsignacion";
import PatioSelect from "../components/forms/PatioSelect";
import ZonaSelect from "../components/forms/ZonaSelect";
import QuantityInput from "../components/forms/QuantityInput";

export default function AsignBagPage() {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState("");
  const [selectedPatio, setSelectedPatio] = useState("");
  const [selectedZona, setSelectedZona] = useState("");

  const lotes = useBatchStore((state) => state.lotes);
  const lote = lotes.find((item) => item.id === id);

  const patios = usePatioStore((state) => state.patios);
  const patioActual = patios.find((p) => p.id === selectedPatio);

  const { celdas, generarGrid, setOcupadas, actualizarEstado } = useCellStore();

  useEffect(() => {
    generarGrid(4, 3);
    setOcupadas([
      { fila: 1, columna: 1 },
      { fila: 1, columna: 2 },
      { fila: 3, columna: 2 },
    ]);
  }, [generarGrid, setOcupadas]);

  const handleClear = () => {
    setCantidad("");
    setSelectedPatio("");
    setSelectedZona("");
  };

  const handleSave = () => {
    console.log("Guardar asignación", {
      lote: lote?.loteName,
      patio: patioActual?.nombre,
      zona: patioActual?.zonas.find((z) => z.id === selectedZona)?.nombre,
      cantidad,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <HeaderAsignacion
        loteName={lote?.loteName}
        totalSacks={lote?.sacks.length || 0}
        assignedSacks={lote?.sacks.filter((s) => s.estate === "asigned").length || 0}
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <PatioSelect
          patios={patios}
          selectedPatio={selectedPatio}
          onChange={(id) => {
            setSelectedPatio(id);
            setSelectedZona("");
          }}
        />

        <ZonaSelect
          zonas={patioActual?.zonas || []}
          selectedZona={selectedZona}
          onChange={setSelectedZona}
          disabled={!selectedPatio}
        />

        <QuantityInput value={cantidad} onChange={setCantidad} />

        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">
            Asignar
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow transition"
          >
            Limpiar
          </button>
        </div>
      </div>

      <div className="mt-6 border rounded-lg p-4 bg-white shadow">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Distribución de sacos
        </h4>
        {selectedZona && (
          <Grid
            columnas={3}
            celdas={celdas}
            onCellClick={(id) => actualizarEstado(id, "asignado")}
          />
        )}
      </div>

      <div className="flex justify-center gap-6 pt-4">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Guardar
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

