import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FrameDisplay = ({ pasos, color = '#00ffff', delay = 1000 }) => {
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
    <div className="overflow-x-auto max-w-full mt-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-2xl border-[3px] shadow-lg"
        style={{
          borderColor: color,
          backgroundColor: '#1f2937',
          boxShadow: `0 0 25px ${color}40`,
        }}
      >
        <table className="table-auto border-separate border-spacing-0 mx-auto w-full text-lg text-center font-medium text-white">
          <thead>
            <tr className="bg-[#111827] text-cyan-300">
              <th className="px-4 py-3 rounded-tl-2xl text-left font-bold text-xl"> </th>
              {historial.map((_, index) => (
                <th key={index} className="px-4 py-3 border-b border-cyan-500">
                  P {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 font-semibold text-left border-t border-cyan-500 text-pink-400 text-xl">Página</td>
              {historial.map((paso, i) => (
                <motion.td
                  key={i}
                  className="px-4 py-3 border-t border-cyan-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {paso.pagina}
                </motion.td>
              ))}
            </tr>
            {[...Array(maxMarcos)].map((_, marcoIndex) => (
              <tr key={marcoIndex}>
                <td className="px-4 py-3 font-semibold text-left text-violet-300">Marco {marcoIndex + 1}</td>
                {historial.map((paso, i) => {
                  const hayPasoSiguiente = i < historial.length - 1;
                  const valorActual = paso.memoria[marcoIndex];
                  const valorSiguiente = hayPasoSiguiente ? historial[i + 1].memoria[marcoIndex] : undefined;
                  const salio = hayPasoSiguiente && valorActual !== valorSiguiente && valorActual !== undefined;

                  return (
                    <motion.td
                      key={i}
                      className="px-4 py-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.05 }}
                    >
                      <div className="relative inline-block w-10 h-10 rounded-lg border border-cyan-400 bg-[#0f172a] shadow-inner text-center leading-10 text-white">
                        {valorActual ?? '-'}

                        {/* Vida extra */}
                        {paso.vidaExtra?.[marcoIndex] && (
                          <span
                            className="absolute -top-2 -right-2 animate-pulse text-lg"
                            title="Vida extra"
                          >
                            🛡️
                          </span>
                        )}

                        {/* Emoji de salida */}
                        {salio && (
                          <span
                            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xl"
                            title="Este valor fue reemplazado en el siguiente paso"
                          >
                            ⬇
                          </span>
                        )}
                      </div>
                    </motion.td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td className="px-4 py-3 font-semibold text-left text-green-400 rounded-bl-2xl">Fallo</td>
              {historial.map((paso, i) => (
                <motion.td
                  key={i}
                  className="px-4 py-3 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full shadow border-2 ${
                      paso.fallo
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'bg-green-500/20 border-green-500 text-green-300'
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
