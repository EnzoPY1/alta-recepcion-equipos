import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function RecepcionPaquetes({ dispositivos }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recepción de Paquetes</h2>
      <button
        onClick={() => navigate("/cargar")}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Cargar Dispositivo
      </button>
      {dispositivos.length === 0 ? (
        <p>No hay dispositivos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dispositivos.map((registro, index) => (
            <div
              key={index}
              className={`border p-4 rounded shadow ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">Recepción</h3>
              <p>
                <strong>Fecha:</strong> {registro.fecha || "No definida"}
              </p>
              <p>
                <strong>Código:</strong> {registro.codigoRecepcion || "N/A"}
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Cliente</h3>
              <p>
                <strong>Nombre:</strong> {registro.cliente.nombre || "N/A"}
              </p>
              <p>
                <strong>Documento:</strong>{" "}
                {registro.cliente.documento || "N/A"}
              </p>
              <p>
                <strong>Teléfono:</strong> {registro.cliente.telefono || "N/A"}
              </p>
              <p>
                <strong>Correo:</strong> {registro.cliente.correo || "N/A"}
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Dispositivo</h3>
              <p>
                <strong>Dispositivo:</strong>{" "}
                {registro.dispositivo.dispositivo || "N/A"}
              </p>
              <p>
                <strong>Marca:</strong> {registro.dispositivo.marca || "N/A"}
              </p>
              <p>
                <strong>Modelo:</strong> {registro.dispositivo.modelo || "N/A"}
              </p>
              <p>
                <strong>Cantidad:</strong> {registro.dispositivo.cantidad || 1}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecepcionPaquetes;
