import { schedulerApi } from './api'

const Jobs = async () => {
  return await schedulerApi.get('/scheduler/jobs')
};

const postJob = async (payload) => {
  return await schedulerApi.post('/scheduler/jobs', payload)
};

const patchJob = async (job) => {
  return await schedulerApi.patch(`scheduler/jobs/${job.id}`, {...job, id: undefined});
};

export { Jobs, postJob, patchJob }