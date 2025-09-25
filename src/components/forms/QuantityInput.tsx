// components/forms/QuantityInput.tsx
interface QuantityInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuantityInput({ value, onChange }: QuantityInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Cantidad para asignar
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ej: 5"
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>
  );
}
