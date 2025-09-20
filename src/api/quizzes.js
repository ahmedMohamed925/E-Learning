import { apiGet, apiPost, apiPut, apiDelete } from './apiClient.js';

export const getQuizzes = async () => {
  return await apiGet('/api/quizzes/');
};

export const getQuizzesByGrade = async (gradeParam) => {
  return await apiGet(`/api/quizzes/grade/${gradeParam}`);
};

export const createQuiz = async (quizData) => {
  return await apiPost('/api/quizzes/', quizData);
};

export const updateQuiz = async (id, quizData) => {
  return await apiPut(`/api/quizzes/${id}`, quizData);
};

export const deleteQuiz = async (id) => {
  return await apiDelete(`/api/quizzes/${id}`);
};