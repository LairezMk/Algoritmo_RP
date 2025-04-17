import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="overflow-x-auto max-w-full mt-4">
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4 }}
         className="p-6 rounded-xl shadow-lg border-4"
         style={{
           borderColor: color,
           backgroundColor: '#e3d7fa', // light gray background
         }}
      >
        <table className="table-auto border-collapse mx-auto w-full text-sm text-center">
          <thead>
            <tr className="bg-100">
              <th className="border px-3 py-2 rounded-tl-xl"> </th>
              {historial.map((_, index) => (
                <th
                  key={index}
                  className="border px-3 py-2 font-semibold"
                  style={{ backgroundColor: '#e7ecf5' }}
                >
                  P {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Fila Página */}
            <tr>
              <td className="border px-3 py-2 font-bold bg-gray-50">Página</td>
              {historial.map((paso, i) => (
                <motion.td
                  key={i}
                  className="border px-3 py-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ backgroundColor: '#e7ecf5' }}
                >
                  {paso.pagina}
                </motion.td>
              ))}
            </tr>

            {/* Filas de marcos */}
            {[...Array(maxMarcos)].map((_, marcoIndex) => (
              <tr key={marcoIndex}>
                <td className="border px-3 py-2 font-bold bg-gray-50">Marco {marcoIndex + 1}</td>
                {historial.map((paso, i) => (
                  <motion.td
                    key={i}
                    className="border px-3 py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.05 }}
                    style={{ backgroundColor: '#e7ecf5' }}
                  >
                    <span
                      className="inline-block w-9 h-9 leading-9 rounded-lg border shadow-sm relative"
                      style={{ backgroundColor: '#e7ecf5' }}
                    >
                      {paso.memoria[marcoIndex] ?? '-'}
                      {paso.vidaExtra?.[marcoIndex] && (
                      <span className="absolute -top-1 -right-1 text-xs" style={{fontSize: '1.1rem'}}  >🛡️</span>
                      )}
                    </span>
                  </motion.td>
                ))}
              </tr>
            ))}

            {/* Fila Fallos */}
            <tr>
              <td className="border px-3 py-2 font-bold bg-gray-50 rounded-bl-xl">Fallo</td>
              {historial.map((paso, i) => (
                <motion.td
                  key={i}
                  className="border px-3 py-2 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  style={{
                    backgroundColor: '#e7ecf5',
                    color: paso.fallo ? '#dc2626' : '#16a34a',
                  }}
                >
                  {paso.fallo ? '✗' : '✓'}
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