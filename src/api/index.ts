import axios from 'axios';
import { BASE_URL, api } from '../constants'


export const signUp = async (path: string, data) => {
  const response = await api.post(`/${path}`, data)
  return response.data;
}

export const logIn = async (path: string, data) => {
  const response = await api.post(`/${path}/login`, data)
  return response.data;
}


export const getAllEnrolledStudentsByTeacher = async (id: string) => {
  const response = await api.get(`/teacher/${id}/enrolled-participants`)
  return response.data;
}

export const getAllCoursesByTeacher = async (id: string) => {
  const response = await api.get(`/teacher/${id}/courses`)
  return response.data;
}


export const getCourseByTeacher = async (teacherId: string, id: string) => {
  const response = await api.get(`/course/${teacherId}/${id}`)
  return response.data;
}

export const createCourse = async (data) => {
  const response = await api.post(`/course`, data)
  return response.data;
}

// /course/:teacherId/:courseId
export const createCourseChapter = async (teacherId: string, courseId: string, data) => {
  const response = await api.post(`/course/${teacherId}/${courseId}`, data)
  return response.data;
}

export const deleteCourseChapter = async (teacherId: string, courseId: string, chapterId: string) => {
  const response = await api.delete(`/course/${teacherId}/${courseId}/chapter/${chapterId}`)
  return response.data;
}


// student

export const getEnrolledCourses = async (id: string) => {
  const response = await api.get(`/student/${id}/enrolled-courses`)
  return response.data;
}


// public apis


export const getCourseList = async () => {
  const response = await axios.get(`${BASE_URL}/course`)
  return response.data;
}

export const getCoursePublicById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/course/${id}`)
  return response.data;
}
