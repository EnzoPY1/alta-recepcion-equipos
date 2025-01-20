import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AltaCliente({ clientes, setClientes, onCancel, isPopup = false }) {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    correo: "",
  });

  const clienteInicial = {
    nombre: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    correo: "",
  };

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleLimpiar = () => {
    setCliente(clienteInicial);
  };

  const handleCancelar = () => {
    if (isPopup && onCancel) {
      onCancel();
    } else {
      navigate("/clientes");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos obligatorios estén llenos
    if (
      !cliente.nombre ||
      !cliente.tipoDocumento ||
      !cliente.documento ||
      !cliente.telefono
    ) {
      alert("Todos los campos obligatorios deben estar llenos.");
      return;
    }

    // Guardar el cliente en el estado global
    setClientes((prevClientes) => ({
      ...prevClientes,
      [cliente.documento]: cliente,
    }));

    if (isPopup) {
      if (onCancel) {
        onCancel(cliente); // Pasar el cliente creado al componente padre
      }
    } else {
      navigate("/clientes"); // Solo navegar si no es un popup
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del Cliente"
        value={cliente.nombre}
        onChange={handleChange}
        className="border px-4 py-2 rounded w-full"
        required
      />
      <select
        name="tipoDocumento"
        value={cliente.tipoDocumento}
        onChange={handleChange}
        className="border px-4 py-2 rounded w-full"
        required
      >
        <option value="">Tipo de Documento</option>
        <option value="CI">CI</option>
        <option value="RUC">RUC</option>
        <option value="DNI">DNI</option>
      </select>
      <input
        type="text"
        name="documento"
        placeholder="Número de Documento"
        value={cliente.documento}
        onChange={handleChange}
        className="border px-4 py-2 rounded w-full"
        required
      />
      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={cliente.telefono}
        onChange={handleChange}
        className="border px-4 py-2 rounded w-full"
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo Electrónico (Opcional)"
        value={cliente.correo}
        onChange={handleChange}
        className="border px-4 py-2 rounded w-full"
      />
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={handleLimpiar}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Limpiar
        </button>
        <button
          type="button"
          onClick={handleCancelar}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default AltaCliente;
