import axios from 'axios';
import { environment } from './environment'

/* Cria a conexão com o scheduler */
const schedulerApi = axios.create({
  baseURL: environment.apiUrl
})

export { schedulerApi }