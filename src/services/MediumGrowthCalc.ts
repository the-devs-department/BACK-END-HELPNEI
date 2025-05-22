export default function CalcMedGrowth(totalUsersFinal: number) {
    const numMeses = 12;
    let usersPerMonth: number[] = new Array(numMeses).fill(0);
    usersPerMonth[numMeses - 1] = totalUsersFinal;
  
    const crescimentoMedioPorMes = Math.floor(totalUsersFinal / numMeses);
    let minPrimeiroMes = Math.max(1, Math.floor(crescimentoMedioPorMes * 0.2))
    if (totalUsersFinal < numMeses) {
        minPrimeiroMes = 1;
    }
    usersPerMonth[0] = minPrimeiroMes;
    let crescimentoTotalRestante = totalUsersFinal - usersPerMonth[0];
    let incrementosPorMes: number[] = new Array(numMeses - 1).fill(0);

    const baseIncremento = Math.floor(crescimentoTotalRestante / (numMeses - 1));
    let restoIncremento = crescimentoTotalRestante % (numMeses - 1);

    for (let i = 0; i < numMeses - 1; i++) {
        incrementosPorMes[i] = baseIncremento;
        if (i >= (numMeses - 1) - restoIncremento) { 
            incrementosPorMes[i]++;
        }
    }
    for (let i = 1; i < numMeses - 1; i++) {
        if (incrementosPorMes[i] < incrementosPorMes[i - 1]) {
            incrementosPorMes[i] = incrementosPorMes[i - 1];
        }
    }

    let currentIncrementSum = incrementosPorMes.reduce((sum, val) => sum + val, 0);
    let diffIncrement = currentIncrementSum - crescimentoTotalRestante;

    while (diffIncrement > 0) {
        for (let i = numMeses - 2; i >= 0 && diffIncrement > 0; i--) {
            if (incrementosPorMes[i] > 1) {
                incrementosPorMes[i]--;
                diffIncrement--;
            }
        }
    }
    while (diffIncrement < 0) {
        for (let i = 0; i < numMeses - 1 && diffIncrement < 0; i++) {
            incrementosPorMes[i]++;
            diffIncrement++;
        }
    }


    for (let i = 1; i < numMeses; i++) {
        usersPerMonth[i] = usersPerMonth[i - 1] + incrementosPorMes[i - 1];
    }
    usersPerMonth[numMeses - 1] = totalUsersFinal;


    for (let i = 1; i < numMeses; i++) {
        if (usersPerMonth[i] < usersPerMonth[i - 1]) {
            usersPerMonth[i] = usersPerMonth[i - 1];
        }
    }

    let crescimentoMedioFinal: number = 0;    
    for (let i = numMeses-1; i > 0; i--){
      if(i !== 0){
        crescimentoMedioFinal += ((usersPerMonth[i]- usersPerMonth[i-1])/usersPerMonth[i-1])*100
      }else {
        break
      }
    }

    return (crescimentoMedioFinal/12).toFixed(2)
}