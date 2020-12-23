const concatZero = (args) => {
  if(args < 10){
    return '0'.concat(args.toString());
  }else return args
}

const isUndefined = (args) => {
  if(args == undefined) {
    return args = '*'
  } 
  else return args
}

function dateToString(args) {

  /*  
    OBS: Essa função recebe uma STRING data formatada pelo Scheduler API
    e converte em uma string amigável a interface
  */

  if(args) {
    /* Formatação das datas enviadas para data JS */
    const date = new Date(args);
    const payload = {
      dia: concatZero(date.getDate()),
      mes: concatZero(date.getMonth()+1),
      ano: date.getFullYear(),
      hora: concatZero(date.getHours()),
      minuto: concatZero(date.getMinutes()),
      segundo: concatZero(date.getSeconds()),
    }
    const response = `${payload.dia}/${payload.mes}/${payload.ano} ${payload.hora}:${payload.minuto}:${payload.segundo}`

    return response
  } 
  else return 'Não executado'.toUpperCase();
}

function formatTrigger(args) {

  /* 
    OBS: Essa função concatena a trigger
    com os horários de e fornecidos
    pelo Scheduler API
  */

  const payload = {
    trigger: isUndefined(args.trigger),
    minute: isUndefined(args.minute),
    hour: isUndefined(args.hour),
    day: isUndefined(args.day),
    month: isUndefined(args.month),
    day_of_week: isUndefined(args.day_of_week),
  }

  const response = `${payload.trigger} ${payload.minute} ${payload.hour} ${payload.day} ${payload.month} ${payload.day_of_week}`
  return response
}

function formatHttpMethod(args) {
  return "jobs:".concat(args.toLowerCase().replace(' ', '_'))
}
export { dateToString, formatTrigger, formatHttpMethod }