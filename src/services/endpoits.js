import { schedulerApi } from './api'

const Jobs = async() => {
  return await schedulerApi.get('/scheduler/jobs')
}

const GetUserMe = async() => {
  return await schedulerApi.get('/oauth/user/me')
}

export { Jobs, GetUserMe }