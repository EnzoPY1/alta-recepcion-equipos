import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`p-4 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link to="/">Sistema de Gestión</Link>
        </h1>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          <Link to="/recepcion-paquetes" className="hover:underline">
            Recepción de Paquetes
          </Link>
          <Link to="/clientes" className="hover:underline">
            Clientes
          </Link>
          <Link to="/dispositivos" className="hover:underline">
            Dispositivos
          </Link>
          {/* Botón de toggle */}
          <button
            onClick={toggleTheme}
            className={`w-12 h-5 rounded-full flex items-center transition duration-300 focus:outline-none shadow ${
              theme === "dark"
                ? "bg-gray-700 justify-end"
                : "bg-yellow-500 justify-start"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transform transition-transform duration-300 ${
                theme === "dark" ? "bg-gray-500" : "bg-white"
              }`}
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-yellow-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-yellow-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
