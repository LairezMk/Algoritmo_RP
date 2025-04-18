import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FrameDisplay = ({ pasos, color = '#b9cef3', delay = 1000 }) => {
  const [pasoActual, setPasoActual] = useState(0);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    if (pasoActual < pasos.length) {
      const timeout = setTimeout(() => {
        setHistorial(prev => [...prev, pasos[pasoActual]]);
        setPasoActual(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [pasoActual, pasos, delay]);

  const maxMarcos = Math.max(...historial.map(p => p.memoria.length), 0);

  return (
    <div className="overflow-x-auto max-w-full mt-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-2xl shadow-xl border-[5px]"
        style={{
          borderColor: color,
          backgroundColor: '#f8f9fc',
        }}
      >
        <table className="table-auto border-separate border-spacing-0 mx-auto w-full text-sm text-center font-medium">
          <thead>
            <tr className="text-indigo-900">
              <th className="px-4 py-3 rounded-tl-2xl bg-indigo-50 text-left"> </th>
              {historial.map((_, index) => (
                <th
                  key={index}
                  className="px-4 py-3 bg-indigo-50 border-b"
                >
                  P {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Fila Página */}
            <tr>
              <td className="px-4 py-3 font-semibold bg-white text-left border-t">Página</td>
              {historial.map((paso, i) => (
                <motion.td
                  key={i}
                  className="px-4 py-3 bg-white border-t"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {paso.pagina}
                </motion.td>
              ))}
            </tr>

            {/* Filas de marcos */}
            {[...Array(maxMarcos)].map((_, marcoIndex) => (
              <tr key={marcoIndex}>
                <td className="px-4 py-3 font-semibold bg-white text-left">Marco {marcoIndex + 1}</td>
                {historial.map((paso, i) => (
                  <motion.td
                    key={i}
                    className="px-4 py-3 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.05 }}
                  >
                    <div className="relative inline-block w-10 h-10 rounded-lg border border-gray-300 bg-gray-50 shadow text-center leading-10 text-gray-800">
                      {paso.memoria[marcoIndex] ?? '-'}

                      {paso.vidaExtra?.[marcoIndex] && (
                        <span
                          className="absolute -top-2 -right-2 animate-pulse text-lg"
                          title="Vida extra"
                        >
                          🛡️
                        </span>
                      )}
                    </div>
                  </motion.td>
                ))}
              </tr>
            ))}

            {/* Fila Fallos */}
            <tr>
              <td className="px-4 py-3 font-semibold bg-white text-left rounded-bl-2xl">Fallo</td>
              {historial.map((paso, i) => (
                <motion.td
                  key={i}
                  className="px-4 py-3 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full shadow-sm border-2 ${
                      paso.fallo
                        ? 'bg-red-100 border-red-500 text-red-600'
                        : 'bg-green-100 border-green-500 text-green-600'
                    }`}
                  >
                    {paso.fallo ? '✗' : '✓'}
                  </span>
                </motion.td>
              ))}
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default FrameDisplay;
