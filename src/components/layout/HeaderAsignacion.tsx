// components/layout/HeaderAsignacion.tsx
interface HeaderAsignacionProps {
  loteName?: string;
  totalSacks: number;
  assignedSacks: number;
}

export default function HeaderAsignacion({
  loteName,
  totalSacks,
  assignedSacks,
}: HeaderAsignacionProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <h3 className="text-lg font-semibold text-gray-800">
        Lote: <span className="text-blue-600">{loteName || "No encontrado"}</span>
      </h3>
      <span className="text-gray-600">
        Sacos asignados: {assignedSacks}/{totalSacks}
      </span>
    </div>
  );
}
