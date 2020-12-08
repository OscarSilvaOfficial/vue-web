// Adiciona o zero SE o valor for menor que 10
const concatZero = (args) => {
  if(args < 10){
    return '0'.concat(args.toString());
  }else return args
}

// Conversão das datas enviadas da API
export function stringToDate(args) {
  if(args) {
    const data = new Date((args).replace('T', ' ').replace('-03:00', ''));
    const res = {
      dia: concatZero(data.getDate()),
      mes: concatZero(data.getMonth()+1),
      ano: data.getFullYear(),
      hora: concatZero(data.getHours()),
      minuto: concatZero(data.getMinutes()),
      segundo: concatZero(data.getSeconds()),
    }
    return `${res.dia}/${res.mes}/${res.ano} ${res.hora}:${res.minuto}:${res.segundo}`
  }
}