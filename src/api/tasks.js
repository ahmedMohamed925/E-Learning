import { apiGet, apiPost, apiPut, apiDelete } from './apiClient.js';

export const getTasks = async () => {
  return await apiGet('/api/tasks/');
};

export const getTasksByGrade = async (gradeParam) => {
  return await apiGet(`/api/tasks/grade/${gradeParam}`);
};

export const createTask = async (taskData) => {
  return await apiPost('/api/tasks/', taskData);
};

export const updateTask = async (id, taskData) => {
  return await apiPut(`/api/tasks/${id}`, taskData);
};

export const deleteTask = async (id) => {
  return await apiDelete(`/api/tasks/${id}`);
};