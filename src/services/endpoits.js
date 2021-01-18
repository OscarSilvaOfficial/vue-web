import { schedulerApi } from './api'

export const getJobs = async () => {
  return await schedulerApi.get('scheduler/jobs')
};

export const postJob = async (payload) => {
  return await schedulerApi.post('scheduler/jobs', payload)
};

export const patchJob = async (job) => {
  return await schedulerApi.patch(`scheduler/jobs/${job.id}`, {...job, id: undefined});
};

export const removeJob = (id) => {
  return schedulerApi.delete(`scheduler/jobs/${id}`);
};

export const pauseJob = (id) => {
  return schedulerApi.post(`scheduler/jobs/${id}/pause`);
};

export const resumeJob = (id) => {
  return schedulerApi.post(`scheduler/jobs/${id}/resume`);
};

export const runJob = (id) => {
  return schedulerApi.post(`scheduler/jobs/${id}/run`);
};

export const getGroups = () => {
  return schedulerApi.get(`scheduler/groups`)
}

export const postGroup = (payload) => {
  return schedulerApi.post(`scheduler/groups`, payload)
}

export const getLogs = (id) => {
  return schedulerApi.get(`scheduler/logs/${id}`)
}

export const postLog = (payload) => {
  return schedulerApi.post(`scheduler/logs`, payload)
}

export const getUserMe = () => {
  return schedulerApi.get('oauth/user/me')
}

