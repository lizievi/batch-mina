import Grid from "../components/Grid";

export default function EditPage() {
  return (
    <>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">
            Selecciona un Lote:
          </label>
          <select className="border p-2 rounded w-full">
            <option value="">-- Elige un lote --</option>
            <option>Lote</option>
            <option>Lote 2</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Selecciona un Área:
          </label>
          <select className="border p-2 rounded w-full">
            <option value="">-- Elige un área --</option>

            <option>Área</option>
            <option>Area 2</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </form>

      <Grid rows={3} columns={4} />
    </>
  );
}
