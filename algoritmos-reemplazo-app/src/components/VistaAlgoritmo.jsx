import FrameDisplay from './FrameDisplay';

const VistaAlgoritmo = ({ algoritmoActivo, resultados, color }) => {
  const algoritmo = resultados[algoritmoActivo];

  return (
    <div className="flex-1 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Algoritmo {algoritmoActivo}
      </h2>
      {algoritmo && algoritmo.length > 0 ? (
        <FrameDisplay pasos={algoritmo} color={color} />
      ) : (
        <p className="text-center text-gray-500">Aún no se han generado pasos para este algoritmo.</p>
      )}
    </div>
  );
};

export default VistaAlgoritmo;
