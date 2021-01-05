import { schedulerApi } from './api'

const Jobs = async () => {
  return await schedulerApi.get('scheduler/jobs')
};

const postJob = async (payload) => {
  return await schedulerApi.post('scheduler/jobs', payload)
};

const patchJob = async (job) => {
  return await schedulerApi.patch(`scheduler/jobs/${job.id}`, {...job, id: undefined});
};

const removeJob = (id) => {
  return schedulerApi.delete(`scheduler/jobs/${id}`);
};

const pauseJob = (id) => {
  return schedulerApi.post(`scheduler/jobs/${id}/pause`);
};

const resumeJob = (id) => {
  return schedulerApi.post(`scheduler/jobs/${id}/resume`);
};

const runJob = (id) => {
  return schedulerApi.post(`scheduler/jobs/${id}/run`);
};

const groups = () => {
  return schedulerApi.get(`scheduler/groups`)
}

const postGroup = (payload) => {
  return schedulerApi.post(`scheduler/groups`, payload)
}

export { Jobs, postJob, patchJob, removeJob,
         runJob, resumeJob, pauseJob, groups,
          postGroup }