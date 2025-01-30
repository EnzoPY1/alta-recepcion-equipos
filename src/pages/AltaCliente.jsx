import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AltaCliente({ clientes, setClientes }) {
  const navigate = useNavigate();
  const location = useLocation();
  const clienteEditado = location.state?.cliente || null; // Cliente a editar si existe

  const [formData, setFormData] = useState({
    nombre: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    correo: "",
  });

  // Precarga los datos si se está editando un cliente
  useEffect(() => {
    if (clienteEditado) {
      setFormData(clienteEditado);
    }
  }, [clienteEditado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Agregar o actualizar el cliente en el estado
    setClientes((prevClientes) => ({
      ...prevClientes,
      [formData.documento]: formData,
    }));

    // Redirigir a la lista de clientes
    navigate("/clientes");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {clienteEditado ? "Editar Cliente" : "Alta Cliente"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full mb-2"
          required
        />
        <select
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full mb-2"
          required
        >
          <option value="">Tipo de Documento</option>
          <option value="CI">Cédula de Identidad</option>
          <option value="RUC">RUC</option>
          <option value="DNI">DNI</option>
        </select>
        <input
          type="text"
          name="documento"
          placeholder="Número de Documento"
          value={formData.documento}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full mb-2"
          required
          disabled={clienteEditado} // Evita cambiar el documento al editar
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full mb-2"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full mb-2"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {clienteEditado ? "Guardar Cambios" : "Guardar"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/clientes")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AltaCliente;
