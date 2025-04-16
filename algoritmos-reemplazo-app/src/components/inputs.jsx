import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SolicitarDatos = ({ onSimular }) => {
  const [algoritmo, setAlgoritmo] = useState('FIFO');
  const [referencias, setReferencias] = useState('');
  const [marcos, setMarcos] = useState(3);
  const [color, setColor] = useState('#007bff');

  const [errorReferencias, setErrorReferencias] = useState('');
  const [errorMarcos, setErrorMarcos] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const refNumeros = referencias
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(n => !isNaN(n));
    const marcosNum = parseInt(marcos);

    let errores = false;

    if (refNumeros.length === 0) {
      setErrorReferencias('Ingresa al menos una referencia numérica válida separada por comas.');
      errores = true;
    } else {
      setErrorReferencias('');
    }

    if (isNaN(marcosNum) || marcosNum < 1 || marcosNum > 5) {
      setErrorMarcos('El número de marcos debe estar entre 1 y 5.');
      errores = true;
    } else {
      setErrorMarcos('');
    }

    if (errores) return;

    onSimular({ algoritmo, referencias: refNumeros, marcos: marcosNum, color });

    // Mostrar toast de éxito
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="p-4 max-w-xl mx-auto bg-white shadow rounded space-y-4"
      >
        <h2 className="text-xl font-bold">Simular Algoritmo</h2>

        {/* Selector de algoritmo */}
        <div>
          <label className="block font-medium mb-1">Algoritmo:</label>
          <select
            className="w-full border p-2 rounded transition focus:ring-2 focus:ring-blue-500"
            value={algoritmo}
            onChange={(e) => setAlgoritmo(e.target.value)}
          >
            <option value="FIFO">FIFO</option>
            <option value="LRU">LRU</option>
            <option value="FIFOPlus">FIFO+</option>
          </select>
        </div>

        {/* Referencias */}
        <div>
          <label className="block font-medium mb-1">Referencias de páginas (separadas por coma):</label>
          <input
            type="text"
            value={referencias}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9,\s]*$/.test(value)) setReferencias(value);
            }}
            className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 transition ${
              errorReferencias ? 'border-red-400' : ''
            }`}
            placeholder="Ej: 7,0,1,2,0,3,0,4..."
          />
          <AnimatePresence>
            {errorReferencias && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-start text-red-600 text-sm mt-1 bg-red-50 p-2 rounded"
              >
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5" />
                <span>{errorReferencias}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Marcos */}
        <div>
          <label className="block font-medium mb-1">Número de marcos (1 a 5):</label>
          <input
            type="number"
            value={marcos}
            min={1}
            max={5}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) setMarcos(value);
            }}
            className={`w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 transition ${
              errorMarcos ? 'border-red-400' : ''
            }`}
            placeholder="Entre 1 y 5"
          />
          <AnimatePresence>
            {errorMarcos && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-start text-red-600 text-sm mt-1 bg-red-50 p-2 rounded"
              >
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5" />
                <span>{errorMarcos}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Color */}
        <div>
          <label className="block font-medium mb-2">Color del borde de la tabla:</label>
          <HexColorPicker color={color} onChange={setColor} />
          <div className="mt-2 text-sm">Color seleccionado: <span style={{ color }}>{color}</span></div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-2 transition-all"
        >
          Generar tabla
        </button>
      </form>

      {/* Toast de éxito */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded shadow flex items-center gap-2 z-50"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Parámetros válidos, simulación generada con éxito.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolicitarDatos;
