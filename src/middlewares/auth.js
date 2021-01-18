import { schedulerApi } from '../services/api'
import { environment } from '../services/environment'

const createSessionToken = (to, from, next) => {
  const token = to.query.token
  token ? localStorage.setItem('SCHEDULER_AUTH', token):location.href=environment.appsUrl
  next('/')
}

const isLogged = (to, from, next) => {
  const token = localStorage.getItem('SCHEDULER_AUTH')
  schedulerApi.defaults.headers.common['Authentication-Token'] = token;
  token ? next():location.href=environment.appsUrl
}

export { createSessionToken, isLogged }