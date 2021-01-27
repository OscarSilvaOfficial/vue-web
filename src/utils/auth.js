 import { environment } from '../services/environment'
 
 export const logout = () => {
   /* 
    Exclui o token de autenticação 
   */
  localStorage.removeItem('SCHEDULER_AUTH')
  location.href=environment.appsUrl
}