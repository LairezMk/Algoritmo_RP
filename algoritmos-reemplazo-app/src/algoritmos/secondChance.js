export function SecondChance (sequence, numPages) {
    const sequenceArray = sequence.split(' ').map(Number)
    let pageFaults = 0
    const framesArray = new Array(numPages).fill('-')
    const framesArrayTime = new Array(numPages).fill(0)
    const secondChance = new Array(numPages).fill('')
    const framesChanges = new Array(numPages).fill(0)
    const resultFramesMatrix = []
    const resultMatrixChanges = []
    const resultMatrixSecondChance = []
  
    for (let i = 0; i < sequenceArray.length; i++) {
      const page = sequenceArray[i]
      framesChanges.fill('0')
      if (!framesArray.includes(page)) {
        pageFaults++
        if (framesArray.includes('-')) {
          for (let j = 0; j < framesArray.length; j++) {
            if (framesArray[j] === '-') {
              framesArray[j] = page
              framesArrayTime[j] = 0
              framesChanges[j] = 1
              break
            }
          }
        } else {
          let exit
          let indexTime = framesArrayTime.indexOf(Math.max(...framesArrayTime))
          if (secondChance[indexTime] === '') {
            framesArray[indexTime] = page
            framesArrayTime[indexTime] = 0
            secondChance[indexTime] = ''
            framesChanges[indexTime] = 1
            exit = true
          } else {
            secondChance[indexTime] = ''
            for (let j = 1; j < framesArray.length; j++) {
              const framesArrayTimeCopy = [...framesArrayTime]
              indexTime = framesArrayTime.indexOf(framesArrayTimeCopy.sort((a, b) => b - a)[j])
              if (secondChance[indexTime] === '') {
                framesArray[indexTime] = page
                framesArrayTime[indexTime] = 0
                secondChance[indexTime] = ''
                framesChanges[indexTime] = 1
                exit = true
                break
              } else {
                secondChance[indexTime] = ''
              }
            }
          }
          if (exit === undefined) {
            const indexTime = framesArrayTime.indexOf(Math.max(...framesArrayTime))
            framesArray[indexTime] = page
            secondChance[indexTime] = ''
            framesArrayTime[indexTime] = 0
            framesChanges[indexTime] = 1
          }
        }
      } else {
        const indexTime = framesArray.indexOf(page)
        secondChance[indexTime] = '*'
      }
      for (let j = 0; j < framesArrayTime.length; j++) {
        if (framesArray[j] !== '-') {
          framesArrayTime[j]++
        }
      }
      // console.log("Frames: ", framesArray, "Second: ", secondChance, "Time: ", framesArrayTime)
      resultFramesMatrix.push([...framesArray])
      resultMatrixChanges.push([...framesChanges])
      resultMatrixSecondChance.push([...secondChance])
    }
  
    const preMatrix = MatrixCombine(resultFramesMatrix, resultMatrixSecondChance, sequenceArray.length, numPages)
    const resultMatrix = MatrixCombine(preMatrix, resultMatrixChanges, sequenceArray.length, numPages)
  
    return {
      pageFaults,
      resultMatrix
    }
  }