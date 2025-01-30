import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Clientes({ clientes, setClientes }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const clienteArray = Object.values(clientes);
  const [popupDispositivo, setPopupDispositivo] = useState(null); // Dispositivo seleccionado para mostrar en el popup

  const handleEliminarCliente = (documento) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      setClientes((prevClientes) => {
        const nuevosClientes = { ...prevClientes };
        delete nuevosClientes[documento];
        return nuevosClientes;
      });
    }
  };

  const handleEditarCliente = (cliente) => {
    navigate("/alta-cliente", { state: { cliente } });
  };

  const handleVerDispositivo = (dispositivo) => {
    setPopupDispositivo(dispositivo); // Muestra el popup con los detalles del dispositivo
  };

  const cerrarPopup = () => {
    setPopupDispositivo(null); // Cierra el popup
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      <button
        onClick={() => navigate("/alta-cliente")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Alta Cliente
      </button>
      {clienteArray.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {clienteArray.map((cliente, index) => (
            <div
              key={index}
              className={`border p-4 rounded shadow ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">Cliente</h3>
              <p>
                <strong>Nombre:</strong> {cliente.nombre || "N/A"}
              </p>
              <p>
                <strong>Tipo de Documento:</strong>{" "}
                {cliente.tipoDocumento || "N/A"}
              </p>
              <p>
                <strong>Documento:</strong> {cliente.documento || "N/A"}
              </p>
              <p>
                <strong>Teléfono:</strong> {cliente.telefono || "N/A"}
              </p>
              <p>
                <strong>Correo:</strong> {cliente.correo || "N/A"}
              </p>
              {/* Lista de dispositivos asociados */}
              {cliente.dispositivos && cliente.dispositivos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Dispositivos:</h4>
                  <ul className="list-disc pl-4">
                    {cliente.dispositivos.map((dispositivo, i) => (
                      <li
                        key={i}
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => handleVerDispositivo(dispositivo)}
                      >
                        {dispositivo.dispositivo} (
                        {dispositivo.marca || "Sin marca"})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Botones de editar y eliminar */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEditarCliente(cliente)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminarCliente(cliente.documento)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Popup de detalles del dispositivo */}
      {popupDispositivo && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Detalles del Dispositivo</h3>
            <p>
              <strong>Dispositivo:</strong> {popupDispositivo.dispositivo}
            </p>
            <p>
              <strong>Marca:</strong> {popupDispositivo.marca || "N/A"}
            </p>
            <p>
              <strong>Modelo:</strong> {popupDispositivo.modelo || "N/A"}
            </p>
            <p>
              <strong>Descripción:</strong>{" "}
              {popupDispositivo.descripcion || "N/A"}
            </p>
            <p>
              <strong>Cantidad:</strong> {popupDispositivo.cantidad || 1}
            </p>
            {/* Mostrar fotos si existen */}
            {popupDispositivo.fotos && (
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Fotos:</h4>
                <div className="flex gap-2">
                  {popupDispositivo.fotos.map((foto, index) => (
                    <img
                      key={index}
                      src={foto}
                      alt={`Foto ${index + 1}`}
                      className="w-24 h-24 object-cover rounded shadow"
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={cerrarPopup}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes;
