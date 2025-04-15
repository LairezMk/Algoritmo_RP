import { useEffect, useState } from 'react';

const FrameDisplay = ({ pasos, color = '#333', delay = 1000 }) => {
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

  // Calculamos el máximo de marcos mostrados
  const maxMarcos = Math.max(...historial.map(p => p.memoria.length), 0);

  return (
    <div className="overflow-x-auto max-w-full">
      <table className="table-auto border-collapse mx-auto">
        <thead>
          <tr>
            <th className="border px-2 py-1"> </th>
            {historial.map((_, index) => (
              <th key={index} className="border px-2 py-1 text-center">
                Paso {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1 font-bold">Página</td>
            {historial.map((paso, i) => (
              <td key={i} className="border px-2 py-1 text-center">{paso.pagina}</td>
            ))}
          </tr>
          {[...Array(maxMarcos)].map((_, marcoIndex) => (
            <tr key={marcoIndex}>
              <td className="border px-2 py-1 font-bold">Marco {marcoIndex + 1}</td>
              {historial.map((paso, i) => (
                <td key={i} className="border px-2 py-1 text-center">
                  <span
                    className="inline-block w-8 h-8 text-center leading-8 border rounded"
                    style={{ borderColor: color }}
                  >
                    {paso.memoria[marcoIndex] !== undefined && paso.memoria[marcoIndex] !== null
                      ? paso.memoria[marcoIndex]
                      : '-'}
                  </span>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="border px-2 py-1 font-bold">Fallo</td>
            {historial.map((paso, i) => (
              <td
                key={i}
                className="border px-2 py-1 text-center"
                style={{
                  color: paso.fallo ? 'red' : 'green',
                  fontWeight: 'bold',
                }}
              >
                {paso.fallo ? 'Fallo' : '✓'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FrameDisplay;
