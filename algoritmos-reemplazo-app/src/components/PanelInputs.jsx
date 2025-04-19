import { div } from "framer-motion/client";
import { useState, useEffect } from "react";

export default function PanelInputs({
  referencias,
  setReferencias,
  marcos,
  setMarcos,
  color,
  setColor,
  onGenerar,
  setPasos,
}) {
  const valoresIniciales = "7, 0, 1, 2, 0, 3, 0";
  const [entradaTexto, setEntradaTexto] = useState(valoresIniciales);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const valores = valoresIniciales
      .split(/[\s,]+/)
      .map((v) => parseInt(v))
      .filter((v) => !isNaN(v));

    setReferencias(valores);
  }, [setReferencias]);

  const manejarCambioReferencias = () => {
    setIsLoading(true);
    setTimeout(() => {
      setEntradaTexto(valoresIniciales);
      const valores = valoresIniciales
        .split(/[\s,]+/)
        .map((v) => parseInt(v))
        .filter((v) => !isNaN(v));
      setReferencias(valores);
      setMarcos(3);
      setColor("#aabbcc");
      setPasos([]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 space-y-4">
    <div className="bg-zinc-800 text-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-zinc-700 space-y-5">
      <h2 className="text-2xl font-bold text-center text-white mb-2">⚙️ Configuración</h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">Referencias (separadas por coma):</label>
        <input
          type="text"
          value={entradaTexto}
          onChange={(e) => {
            const valor = e.target.value;
            const valorFiltrado = valor.replace(/[^0-9, ]/g, "");
            setEntradaTexto(valorFiltrado);

            const valores = valorFiltrado
              .split(/[\s,]+/)
              .map((v) => parseInt(v))
              .filter((v) => !isNaN(v) && v >= 0);

            setReferencias(valores);
          }}
          className="w-full bg-zinc-700 text-white border border-zinc-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Ej. 7, 0, 1, 2, 0, 3, 0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">Cantidad de marcos:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={marcos}
          onChange={(e) => {
            const valor = e.target.value;
            if (valor === "" || (Number(valor) >= 1 && Number(valor) <= 5)) {
              setMarcos(valor === "" ? "" : Number(valor));
            }
          }}
          className="w-full bg-zinc-700 text-white border border-zinc-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">Color del borde (hex):</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 p-1 bg-zinc-700 rounded-lg cursor-pointer border border-zinc-600"
        />
      </div>

      <button
        onClick={onGenerar}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-indigo-500 transition"
      >
        ▶ Ejecutar algoritmo
      </button>

      <button
        onClick={manejarCambioReferencias}
        className="w-full bg-zinc-700 border border-blue-400 text-blue-300 py-2 rounded-lg font-semibold hover:bg-zinc-600 transition"
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-5 h-5 border-2 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
          </div>
        ) : (
          "🔄 Restablecer valores"
        )}
      </button>
    </div>

  </div>
  );
}

 
