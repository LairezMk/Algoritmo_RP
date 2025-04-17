import { useState } from "react";
import { useEffect } from "react";

export default function PanelInputs({
  referencias,
  setReferencias,
  marcos,
  setMarcos,
  color,
  setColor,
  onGenerar,
}) {
  const valoresIniciales = "7, 0, 1, 2, 0, 3, 0";
  const [entradaTexto, setEntradaTexto] = useState(valoresIniciales);

  useEffect(() => {
    const valores = valoresIniciales
      .split(/[\s,]+/)
      .map((v) => parseInt(v))
      .filter((v) => !isNaN(v));

    setReferencias(valores);
  }, [setReferencias]);


  const manejarCambioReferencias = (e) => {
    setEntradaTexto(e.target.value);

    const valores = e.target.value
      .split(/[\s,]+/)
      .map((v) => parseInt(v))
      .filter((v) => !isNaN(v));

    setReferencias(valores);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md border border-gray-300">
      <h2 className="text-xl font-semibold mb-4 text-center">Configuración</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Referencias (separadas por espacio o coma):</label>
        <input
          type="text"
          value={entradaTexto}
          //Hacer que solo se puedan ingresar números enteros positivos y comas como separadores
          onChange={(e) => {
            const valor = e.target.value;
            // Permitir solo números, comas y espacios
            const valorFiltrado = valor.replace(/[^0-9, ]/g, "");
            setEntradaTexto(valorFiltrado);
        
            // Convertir a un array de números enteros positivos
            const valores = valorFiltrado
              .split(/[\s,]+/) // Separar por comas o espacios
              .map((v) => parseInt(v))
              .filter((v) => !isNaN(v) && v >= 0); // Filtrar valores no numéricos o negativos
        
            setReferencias(valores);
          }}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Ej. 7, 0, 1, 2, 0, 3, 0"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Cantidad de marcos:</label>
        <input
          type="number"
          min="1"
          max="5"
          //hacer que solo se puedan ingresar números enteros positivos entre el rango definido
          value={marcos}
          onChange={(e) => {
            const valor = e.target.value;
            if (valor === "" || (Number(valor) >= 1 && Number(valor) <= 5)) {
              setMarcos(valor === "" ? "" : Number(valor)); // Permite borrar temporalmente
            }
          }}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Color del borde (hex):</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 p-1 rounded-lg cursor-pointer"
        />
      </div>

      <button
        onClick={onGenerar}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
      >
        Ejecutar algoritmo
      </button>
    </div>
  );
}
