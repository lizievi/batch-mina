// src/pages/AsignBagPage.tsx
import Grid from "../components/Grid";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useBatchStore } from "../store/BatchStore";
import { usePatioStore } from "../store/PatioStore";
// import { cellStore } from "../store/CellStore";
import { useCellStore } from "../store/CellStore";
import { useEffect } from "react";


export default function AsignBagPage() {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState("");
  const [selectedPatio, setSelectedPatio] = useState<string>("");
  const [selectedZona, setSelectedZona] = useState<string>("");

  const lotes = useBatchStore((state) => state.lotes);
  const lote = lotes.find((item) => item.id === id);

  const patios = usePatioStore((state) => state.patios);
  const patioActual = patios.find((p) => p.id === selectedPatio);

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

  const handleCancel = () => {
    console.log("Cancelar asignación");
  };

  const { celdas, generarGrid, setOcupadas, actualizarEstado } = useCellStore();

  useEffect(() => {
    generarGrid(4, 3);

    setOcupadas([
      { fila: 1, columna: 1 },
      { fila: 1, columna: 2 },
      { fila: 2, columna: 1 },
    ]);
  }, [generarGrid, setOcupadas]);
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-800">
          Lote:{" "}
          <span className="text-blue-600">
            {lote?.loteName || "Lote no encontrado"}
          </span>
        </h3>
        <span className="text-gray-600">
          Sacos asignados:{" "}
          {lote
            ? `${lote.sacks.filter((s) => s.estate === "asigned").length}/${
                lote.sacks.length
              }`
            : "0/0"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        {/* Select de Patio */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Selecciona un Patio
          </label>
          <select
            value={selectedPatio}
            onChange={(e) => {
              setSelectedPatio(e.target.value);
              setSelectedZona(""); // reset zona
            }}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">-- Elige un patio --</option>
            {patios.map((patio) => (
              <option key={patio.id} value={patio.id}>
                {patio.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Selecciona una Zona
          </label>
          <select
            value={selectedZona}
            onChange={(e) => setSelectedZona(e.target.value)}
            disabled={!selectedPatio}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">-- Elige una zona --</option>
            {patioActual?.zonas.map((zona) => (
              <option key={zona.id} value={zona.id}>
                {zona.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Cantidad para asignar
          </label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Ej: 5"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

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

        <Grid
          columnas={3}
          celdas={celdas}
          onCellClick={(id) => actualizarEstado(id, "asignado")}
        />
      </div>

      {/* Botones inferiores */}
      <div className="flex justify-center gap-6 pt-4">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Guardar
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
