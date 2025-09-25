// components/forms/ZonaSelect.tsx
import type { ZonaType } from "../../store/ZoneStore";

interface ZonaSelectProps {
  zonas: ZonaType[];
  selectedZona: string;
  onChange: (zonaId: string) => void;
  disabled?: boolean;
}

export default function ZonaSelect({
  zonas,
  selectedZona,
  onChange,
  disabled,
}: ZonaSelectProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Selecciona una Zona
      </label>
      <select
        value={selectedZona}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
      >
        <option value=""> Elige una zona </option>
        {zonas.map((zona) => (
          <option key={zona.id} value={zona.id}>
            {zona.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
