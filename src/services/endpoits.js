import { schedulerApi } from './api'

const getJobs = async () => {
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

const getGroups = () => {
  return schedulerApi.get(`scheduler/groups`)
}

const postGroup = (payload) => {
  return schedulerApi.post(`scheduler/groups`, payload)
}

const getLogs = (id) => {
  return schedulerApi.get(`scheduler/logs/${id}`)
}

const postLog = (payload) => {
  return schedulerApi.post(`scheduler/logs`, payload)
}

export {
    getJobs, postJob, patchJob, removeJob,
    runJob, resumeJob, pauseJob, getGroups,
    postGroup, postLog, getLogs,
  }