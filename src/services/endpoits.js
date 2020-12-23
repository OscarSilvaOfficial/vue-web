import { schedulerApi } from './api'

const Jobs = async() => {
  return await schedulerApi.get('/scheduler/jobs')
}

const postJob = async(payload) => {
  return await schedulerApi.post('/scheduler/jobs', payload)
}

export { Jobs, postJob }