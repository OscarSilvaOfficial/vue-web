import { getJobs } from '../services/endpoits';

const replaceApiData = async () => {

  const response = await getJobs();
  for(const data of response.data) {
    /* Conversão da data enviada pela API */
    data.next_run_time = dateToString(data.next_run_time);
    data.last_run_time = dateToString(data.last_run_time);
    /* Formatação das informações do Cron */
    data.trigger = formatTrigger({
      trigger: data.trigger,
      minute: data.minute,
      hour: data.hour,
      day: data.day,
      month: data.month,
      day_of_week: data.day_of_week,
      group_id: data.group_id,
    })
  } 
  return response.data;
}

const concatZero = (args) => {
  return args < 10 ? '0'.concat(args.toString()):args
}

const isUndefined = (args) => {
  return args == undefined ? args = '*':args
}

const dateToString = (args) => {

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
  else return 'Não executando'.toUpperCase();
}

const formatTrigger = (args) => {

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

const formatHttpMethod = (args) => {
  return "jobs:".concat(args.toLowerCase().replace(' ', '_'))
}

const getNumberRange = (begin, final) => {
  const result = [] 
  for(let i = begin; i <= final; i++) {
    result.push(i.toString())
    if(i==final) {
      return result
    }
  } 
}

export { dateToString, formatTrigger, formatHttpMethod, getNumberRange, replaceApiData }