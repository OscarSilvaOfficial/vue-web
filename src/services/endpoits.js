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

const removeJob = (id) => {
  return schedulerApi.delete(`scheduler/jobs/${id}`);
};

const pauseJob = (id) => {
  return axios.post(`scheduler/jobs/${id}/pause`);
};

const resumeJob = (id) => {
  return axios.post(`scheduler/jobs/${id}/resume`);
};

const runJob = (id) => {
  return axios.post(`scheduler/jobs/${id}/run`);
};
export { Jobs, postJob, patchJob, removeJob }