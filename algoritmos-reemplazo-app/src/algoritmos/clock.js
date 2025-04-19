export function Clock(referencias, marcos) {
    let memoria = new Array(marcos).fill(null);
    let uso = new Array(marcos).fill(false); // Bit de uso
    let puntero = 0;
    let pasos = [];
  
    for (let pagina of referencias) {
      let fallo = false;
  
      if (!memoria.includes(pagina)) {
        fallo = true;
  
        while (true) {
          if (!uso[puntero]) {
            memoria[puntero] = pagina;
            uso[puntero] = true;
            puntero = (puntero + 1) % marcos;
            break;
          } else {
            uso[puntero] = false;
            puntero = (puntero + 1) % marcos;
          }
        }
      } else {
        const idx = memoria.indexOf(pagina);
        uso[idx] = true;
      }
  
      pasos.push({
        pagina,
        memoria: [...memoria],
        fallo,
        vidaExtra: [...uso],
      });
    }
  
    return pasos;
  }
  