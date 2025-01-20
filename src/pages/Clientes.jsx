import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

function Clientes({ clientes }) {
  const navigate = useNavigate(); // Inicializa el hook para redirección

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Clientes</h2>
      <button
        onClick={() => navigate("/alta-cliente")} // Redirige a la página de AltaCliente
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Alta de Cliente
      </button>
      {/* Lista de clientes */}
      <div>
        {Object.keys(clientes).length === 0 ? (
          <p>No hay clientes registrados.</p>
        ) : (
          <ul>
            {Object.entries(clientes).map(([id, cliente]) => (
              <li key={id} className="border-b py-2">
                <strong>{cliente.nombre}</strong> - {cliente.documento}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Clientes;
