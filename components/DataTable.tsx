import { useState } from "react";
import { Esbirros } from "@/types";

interface DataTableProps {
  data: Esbirros[];
  loading: boolean;
}

export default function DataTable({ data, loading }: DataTableProps) {
  const [copiedCedula, setCopiedCedula] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => setCopiedCedula(text),
      () => alert("Error al copiar el número de cédula.")
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-96">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-secondary"></span>
          <p>Cargando...</p>
        </div>
      </div>
    );

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>
                  Grado <br /> Militar
                </th>
                <th>Apellidos</th>
                <th>Nombres</th>
                <th>Dirección</th>
                <th>Teléfono Celular</th>
                <th>Teléfono Oficina</th>
                <th>Correo</th>
                <th>Ubicación</th>
                <th>Ubicación Detallada</th>
                <th>Cargo</th>
                <th>Tipo Empleado</th>
                <th>Categoría</th>
                <th>Sueldo</th>
                <th>Fecha Nacimiento</th>
                <th>Sexo</th>
                <th>Estado Civil</th>
                <th>Nivel Instrucción</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Ciudad Origen</th>
                <th>Estado Origen</th>
                <th>Vivienda</th>
                <th>Discapacidad</th>
                <th>Riesgo</th>
                <th>Código</th>
              </tr>
            </thead>
            <tbody className="[&_tr:nth-child(odd)]:bg-primary/20">
              {data.map((row) => (
                <tr key={row.cod_emp}>
                  <td className="flex items-center">
                    <div className="tooltip" data-tip="Copíar">
                      <button
                        onClick={() => copyToClipboard(row.cedula)}
                        className="text-primary flex items-center"
                        aria-label="Copiar cédula"
                      >
                        {copiedCedula === row.cedula ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-clipboard-check"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
                            />
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-clipboard"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                          </svg>
                        )}
                        <span className="ml-2">{row.cedula}</span>
                      </button>
                    </div>
                  </td>
                  <td>{row.grado_militar}</td>
                  <td>{`${row.apellido1} ${row.apellido2 || ""}`}</td>
                  <td>{`${row.nombre1} ${row.nombre2 || ""}`}</td>
                  <td>
                    <a
                      className="btn-link"
                      target="_blank"
                      href={`https://www.google.com/maps/search/?api=1&query=${row.direccion}+VENEZUELA`}
                      rel="noopener noreferrer"
                    >
                      {row.direccion}
                    </a>
                  </td>
                  <td>{row.telefono_cel}</td>
                  <td>{row.telefono_ofi}</td>
                  <td>{row.correo}</td>
                  <td>{row.ubicacion}</td>
                  <td>{row.ubicacion_detallada}</td>
                  <td>{row.cargo}</td>
                  <td>{row.tipo_emp}</td>
                  <td>{row.categoria}</td>
                  <td>{row.sueldo}</td>
                  <td>{row.fecha_nacim}</td>
                  <td>{row.sexo}</td>
                  <td>{row.estado_civil}</td>
                  <td>{row.nivel_instruccion}</td>
                  <td>{row.ciudad}</td>
                  <td>{row.estado}</td>
                  <td>{row.ciudad_origen}</td>
                  <td>{row.estados_origen}</td>
                  <td>{row.vivienda}</td>
                  <td>{row.discapacidad}</td>
                  <td>{row.riesgo}</td>
                  <td>{row.cod_emp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
