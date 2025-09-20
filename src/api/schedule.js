import { apiGet, apiPost, apiPut, apiDelete } from './apiClient.js';

export const getSchedule = async () => {
  return await apiGet('/api/schedule/');
};

export const getScheduleByGrade = async (gradeParam) => {
  return await apiGet(`/api/schedule/grade/${gradeParam}`);
};

export const createSchedule = async (scheduleData) => {
  return await apiPost('/api/schedule/', scheduleData);
};

export const updateSchedule = async (id, scheduleData) => {
  return await apiPut(`/api/schedule/${id}`, scheduleData);
};

export const deleteSchedule = async (id) => {
  return await apiDelete(`/api/schedule/${id}`);
};