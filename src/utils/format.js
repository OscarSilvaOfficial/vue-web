import { getJobs, getLogs } from '../services/endpoits';

const replaceApiExecutions = async (job_id) => {
  const dataApi = await getLogs(job_id)
  const executions = dataApi.data

  executions.map(result => {
    result.exec_date = dateToString(result.exec_date)
    result.exec_status = result.exec_status.toUpperCase()
    
  })
  
  return executions
}

const replaceApiData = async () => {
  /* 
    Formata os dados enviados pela API
  */

  const response = await getJobs();
  for(const data of response.data) {
    /* Conversão da data enviada pela API */
    data.next_run_time = dateToString(data.next_run_time);
    data.last_run_time = dateToString(data.last_run_time);
    data.kwargs.headers = JSON.stringify(data.kwargs.headers) 
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
  return args == undefined ? '*':args
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
  /* 
    Formatação do método http para envio dos 
    dados a API 
  */
  return "jobs:".concat(args.toLowerCase().replace(' ', '_'))
}

const getNumberRange = (begin, final) => {
  /* 
    Gera um range de números  
  */
  const result = [] 
  for(let i = begin; i <= final; i++) {
    result.push(i.toString())
    if(i==final) {
      return result
    }
  } 
}

export { dateToString, formatTrigger, formatHttpMethod, 
      getNumberRange, replaceApiData, replaceApiExecutions }