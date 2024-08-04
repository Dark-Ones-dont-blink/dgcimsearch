interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <label className="form-control w-full mb-4">
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => onSearch(e.target.value)}
        className="input input-primary input-lg w-full"
      />
      <div className="label">
        <span className="label-text-alt ml-auto">
          Busca por cualquier valor de columna, ejemplo: cédula, nombre, correo
          etc...
        </span>
      </div>
    </label>
  );
}
