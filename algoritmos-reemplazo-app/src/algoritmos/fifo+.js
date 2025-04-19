export default function FIFOPlus(sequence, numPages) {
    let sequenceArray = sequence;
    let framesArray = new Array(numPages).fill(null);
    let framesArrayTime = new Array(numPages).fill(0);
    let secondChance = new Array(numPages).fill(false);
    let pasos = [];
  
    for (let i = 0; i < sequenceArray.length; i++) {
      let page = sequenceArray[i];
      let fallo = false;
  
      if (!framesArray.includes(page)) {
        fallo = true;
  
        if (framesArray.includes(null)) {
          for (let j = 0; j < framesArray.length; j++) {
            if (framesArray[j] === null) {
              framesArray[j] = page;
              framesArrayTime[j] = 0;
              break;
            }
          }
        } else {
          let replaced = false;
          let indexTime = framesArrayTime.indexOf(Math.max(...framesArrayTime));
  
          for (let j = 0; j < framesArray.length; j++) {
            if (!secondChance[indexTime]) {
              framesArray[indexTime] = page;
              framesArrayTime[indexTime] = 0;
              secondChance[indexTime] = false;
              replaced = true;
              break;
            } else {
              secondChance[indexTime] = false;
              let framesArrayTimeCopy = [...framesArrayTime];
              indexTime = framesArrayTime.indexOf(framesArrayTimeCopy.sort((a, b) => b - a)[1]);
              framesArray[indexTime] = page;
              framesArrayTime[indexTime] = 0;
              secondChance[indexTime] = false;
              replaced = true;
            }
          }
  
          if (!replaced) {
            let indexTime = framesArrayTime.indexOf(Math.max(...framesArrayTime));
            framesArray[indexTime] = page;
            framesArrayTime[indexTime] = 0;
          }
        }
      } else {
        let indexTime = framesArray.indexOf(page);
        secondChance.fill(false);
        secondChance[indexTime] = true;
      }
  
      for (let j = 0; j < framesArrayTime.length; j++) {
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
  

console.log(FIFOPlus([7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0], 3)); // Ejemplo de uso: [1, 2, 3] -> 4 fallos