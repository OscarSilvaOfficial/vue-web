import axios from 'axios';
import { environment } from './environment'

const schedulerApi = axios.create({
  /* 
    Cria a conexão com o scheduler 
    verificando qual ambiente está
  */
  baseURL: environment.apiUrl
})

export { schedulerApi }