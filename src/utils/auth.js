 import { environment } from '../services/environment'
 
 export const logout = () => {
  localStorage.removeItem('SCHEDULER_AUTH')
  location.href=environment.appsUrl
}