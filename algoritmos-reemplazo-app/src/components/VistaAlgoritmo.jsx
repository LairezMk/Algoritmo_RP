const VistaAlgoritmo = ({ algoritmoActivo, resultados, color }) => {
  return (
    <div className="flex-1 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Algoritmo {algoritmoActivo}
      </h2>
      {resultados && resultados.length > 0 ? (
        <FrameDisplay pasos={resultados} color={color} />
      ) : (
        <p className="text-center text-gray-500">Aún no se han generado pasos para este algoritmo.</p>
      )}
    </div>
  );
};

export default VistaAlgoritmo;