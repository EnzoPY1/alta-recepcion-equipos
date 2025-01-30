import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AltaCliente from "./AltaCliente";

function CargarDispositivo({
  dispositivos,
  setDispositivos,
  clientes,
  setClientes,
}) {
  const navigate = useNavigate();
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [filtroClientes, setFiltroClientes] = useState(""); // Texto del buscador
  const [clientesFiltrados, setClientesFiltrados] = useState([]); // Resultados filtrados

  // Función para generar código aleatorio
  const generarCodigoRecepcion = () => {
    return "REC-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  // Estado inicial para el dispositivo
  const dispositivoInicial = {
    fecha: new Date().toLocaleString(), // Fecha de creación del dispositivo
    codigoRecepcion: `REC-${Date.now()}`, // Código único generado
    dispositivo: "",
    marca: "",
    modelo: "",
    numeroSerie: "",
    descripcion: "",
    accesorios: "",
    cantidad: 1,
    fotos: null,
  };

  // Estado para el nuevo dispositivo
  const [nuevoDispositivo, setNuevoDispositivo] = useState(dispositivoInicial);

  // Maneja cambios en los campos del formulario de dispositivo
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNuevoDispositivo({
      ...nuevoDispositivo,
      [name]: files ? files[0] : value,
    });
  };

  const handleClienteChange = (e) => {
    const valor = e.target.value;
    setFiltroClientes(valor);

    // Filtrar clientes según el texto del buscador
    const resultados = Object.values(clientes).filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(valor.toLowerCase()) ||
        cliente.documento.toLowerCase().includes(valor.toLowerCase())
    );
    setClientesFiltrados(resultados);
  };

  const seleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setFiltroClientes(cliente.nombre); // Rellenar el campo con el nombre completo
    setClientesFiltrados([]); // Ocultar la lista de sugerencias
  };

  // Función para limpiar el formulario
  const handleLimpiar = () => {
    setNuevoDispositivo({
      dispositivo: "",
      marca: "",
      modelo: "",
      numeroSerie: "",
      descripcion: "",
      accesorios: "",
      cantidad: 1,
      fotos: null,
      fecha: new Date().toLocaleString(), // Reinicia la fecha
      codigoRecepcion: `REC-${Date.now()}`, // Genera un nuevo código
    });
    setBusquedaCliente("");
    setClienteSeleccionado(null);
  };

  // Función para cancelar y volver atrás
  const handleCancelar = () => {
    navigate("/recepcion-paquetes");
  };

  // Buscar cliente por identificador
  const handleBuscarCliente = () => {
    if (clientes[busquedaCliente]) {
      setClienteSeleccionado(clientes[busquedaCliente]);
    } else {
      alert("Cliente no encontrado.");
      setClienteSeleccionado(null);
    }
  };

  // Agregar cliente desde el popup
  const handleAgregarCliente = (nuevoCliente) => {
    if (nuevoCliente) {
      setClientes((prevClientes) => ({
        ...prevClientes,
        [nuevoCliente.documento]: nuevoCliente,
      }));
      setClienteSeleccionado(nuevoCliente);
      setBusquedaCliente(nuevoCliente.documento);
    }
    setMostrarPopup(false);
  };

  // Guardar dispositivo y redireccionar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clienteSeleccionado) {
      alert("Debe seleccionar un cliente antes de cargar un dispositivo.");
      return;
    }

    const registroDispositivo = {
      recepcion: {
        fecha: nuevoDispositivo.fecha,
        codigoRecepcion: nuevoDispositivo.codigoRecepcion,
      },
      cliente: clienteSeleccionado,
      dispositivo: {
        dispositivo: nuevoDispositivo.dispositivo || "N/A",
        marca: nuevoDispositivo.marca || "N/A",
        modelo: nuevoDispositivo.modelo || "N/A",
        numeroSerie: nuevoDispositivo.numeroSerie || "N/A",
        descripcion: nuevoDispositivo.descripcion || "N/A",
        accesorios: nuevoDispositivo.accesorios || "N/A",
        cantidad: nuevoDispositivo.cantidad,
        fotos: nuevoDispositivo.fotos,
      },
    };

    setDispositivos((prev) => [
      ...prev,
      {
        ...nuevoDispositivo,
        cliente: clienteSeleccionado,
        fecha: new Date().toLocaleString(), // Genera la fecha actual
        codigoRecepcion: `REC-${Date.now()}`, // Genera el código único
      },
    ]);
    // Redirección a recepción de paquetes
    navigate("/recepcion-paquetes");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cargar Dispositivo</h2>

      {/* Sección de fecha y código de recepción */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Fecha de Recepción:
          </label>
          <input
            type="date"
            name="fecha"
            value={nuevoDispositivo.fecha}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Código de Recepción:
          </label>
          <input
            type="text"
            value={nuevoDispositivo.codigoRecepcion}
            className="border px-4 py-2 rounded w-full bg-gray-100"
            disabled
          />
        </div>
      </div>

      {/* Sección de cliente */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Cliente</h3>
        <input
          type="text"
          placeholder="Buscar cliente por CI/RUC"
          value={filtroClientes}
          onChange={handleClienteChange}
          className="border px-4 py-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-700 dark:text-white transition-colors duration-300"
        />
        <button
          onClick={() => setMostrarPopup(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar Cliente
        </button>
        {/* Lista de resultados dinámicos */}
        {clientesFiltrados.length > 0 && (
          <ul className="border rounded bg-white text-gray-900 dark:bg-gray-800 dark:text-white mt-2 shadow-md max-h-40 overflow-y-auto">
            {clientesFiltrados.map((cliente, index) => (
              <li
                key={index}
                className="p-2 hover:bg-blue-100 dark:hover:bg-gray-600 cursor-pointer" // Hover dinámico
                onClick={() => seleccionarCliente(cliente)} // Asigna el cliente al hacer clic
              >
                {cliente.nombre} - {cliente.documento}
              </li>
            ))}
          </ul>
        )}
        {/* Mostrar cliente seleccionado */}
        {clienteSeleccionado && (
          <p className="mt-4">
            Cliente seleccionado:{" "}
            <strong className="text-gray-900 dark:text-yellow-300">
              {clienteSeleccionado.nombre}
            </strong>
          </p>
        )}
      </div>

      {/* Formulario para dispositivos */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="dispositivo"
          placeholder="Dispositivo (Celular, Notebook, etc.)"
          value={nuevoDispositivo.dispositivo}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca (Opcional)"
          value={nuevoDispositivo.marca}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo (Opcional)"
          value={nuevoDispositivo.modelo}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="text"
          name="numeroSerie"
          placeholder="Número de Serie (Opcional)"
          value={nuevoDispositivo.numeroSerie}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción (Requerido)"
          value={nuevoDispositivo.descripcion}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
          required
        />
        <textarea
          name="accesorios"
          placeholder="Accesorios (Opcional)"
          value={nuevoDispositivo.accesorios}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad (Requerido)"
          value={nuevoDispositivo.cantidad}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
          required
        />
        <input
          type="file"
          name="fotos"
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        />

        {/* Botones de acción */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Guardar Dispositivo
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

      {/* Popup para alta de cliente */}
      {mostrarPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Alta de Cliente</h3>
            <AltaCliente
              clientes={clientes}
              setClientes={setClientes}
              onCancel={handleAgregarCliente}
              isPopup={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CargarDispositivo;
