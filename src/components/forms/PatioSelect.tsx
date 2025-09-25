// components/forms/PatioSelect.tsx
import type { PatioType } from "../../store/PatioStore";

interface PatioSelectProps {
  patios: PatioType[];
  selectedPatio: string;
  onChange: (patioId: string) => void;
}

export default function PatioSelect({
  patios,
  selectedPatio,
  onChange,
}: PatioSelectProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Selecciona un Patio
      </label>
      <select
        value={selectedPatio}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <option value=""> Elige un patio </option>
        {patios.map((patio) => (
          <option key={patio.id} value={patio.id}>
            {patio.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
