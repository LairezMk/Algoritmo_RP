function Clock(sequence, numPages) {
  const sequenceArray = sequence;
  const framesArray = new Array(numPages).fill(null);
  const framesArrayTime = new Array(numPages).fill(0);
  const secondChance = new Array(numPages).fill(false);
  const pasos = [];

  for (let i = 0; i < sequenceArray.length; i++) {
    const page = sequenceArray[i];
    let fallo = false;

    if (!framesArray.includes(page)) {
      fallo = true;

      if (framesArray.includes(null)) {
        for (let j = 0; j < framesArray.length; j++) {
          if (framesArray[j] === null) {
            framesArray[j] = page;
            framesArrayTime[j] = 0;
            secondChance[j] = true; 
            break;
          }
        }
      } else {
        let replaced = false;

        // Intentamos encontrar el más antiguo sin segunda oportunidad
        let indicesOrdenados = [...framesArrayTime.keys()]
          .sort((a, b) => framesArrayTime[b] - framesArrayTime[a]);

        for (let k = 0; k < indicesOrdenados.length; k++) {
          let idx = indicesOrdenados[k];
          if (!secondChance[idx]) {
            framesArray[idx] = page;
            framesArrayTime[idx] = 0;
            secondChance[idx] = true;
            replaced = true;
            break;
          } else {
            secondChance[idx] = false; // Quitar vida extra
          }
        }

        // Si no encontró ninguna sin vida, reemplaza la más antigua
        if (!replaced) {
          let indexTime = framesArrayTime.indexOf(Math.max(...framesArrayTime));
          framesArray[indexTime] = page;
          framesArrayTime[indexTime] = 0;
          secondChance[indexTime] = true;
        }
      }
    } else {
      const index = framesArray.indexOf(page);
      secondChance[index] = true;
    }

    // Aumentamos tiempo de todos los marcos ocupados
    for (let j = 0; j < framesArray.length; j++) {
      if (framesArray[j] !== null) {
        framesArrayTime[j]++;
      }
    }

    pasos.push({
      pagina: page,
      memoria: [...framesArray],
      fallo: fallo,
      vidaExtra: [...secondChance],
    });
  }

  return pasos;
}


export default Clock;