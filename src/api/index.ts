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

export const getAllTeacherList = async () => {
  const response = await api.get(`/teacher`)
  return response.data;
}


export const getAllCourseList = async () => {
  const response = await api.get(`/course`)
  return response.data;
}

export const getTeacherById = async (teacherId: string) => {
  const response = await api.get(`/teacher/${teacherId}`)
  return response.data;
}

export const editTeacherById = async (teacherId: string, data) => {
  const response = await api.put(`/teacher/update/${teacherId}`, data)
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

export const uploadCourseImage = async (data) => {
  const response = await api.post(`/course/image`, data)
  return response.data;
}


// rating
export const createCourseRating = async (courseId: string, studentId: string, data) => {
  const response = await api.post(`/course/${courseId}/${studentId}/rating`, data)
  return response.data;
}


// /course/:teacherId/:courseId
export const createCourseChapter = async (teacherId: string, courseId: string, data) => {
  const response = await api.post(`/course/${teacherId}/${courseId}`, data)
  return response.data;
}


export const updateCourseChapter = async (teacherId: string, courseId: string, chapterId: string, data) => {
  const response = await api.put(`/course/${teacherId}/${courseId}/chapter/${chapterId}`, data)
  return response.data;
}

export const deleteCourseChapter = async (teacherId: string, courseId: string, chapterId: string) => {
  const response = await api.delete(`/course/${teacherId}/${courseId}/chapter/${chapterId}`)
  return response.data;
}





// student


export const getStudentById = async (id: string) => {
  const response = await api.get(`/student/${id}`)
  return response.data;
}

export const getEnrolledCourses = async (id: string) => {
  const response = await api.get(`/student/${id}/enrolled-courses`)
  return response.data;
}

export const subscribeToCourse = async (id: string, data) => {
  const response = await api.post(`/student/${id}/create-checkout-session`, { item: data })
  return response.data;
}

export const enrollToCourse = async (studentId: string, courseId: string) => {
  const response = await api.post(`/student/${studentId}/enroll/${courseId}`)
  return response.data;
}

export const editStudentById = async (studentId: string, data) => {
  const response = await api.post(`/student/update/${studentId}`, data)
  return response.data;
}


export const trackChapterProgress = async (studentId: string, chapterId: string, data) => {
  const response = await api.post(`/student/${studentId}/${chapterId}/progress`, data);
  console.log("studentId", studentId)
  return response.data;
}

// admin

export const verifyTeacherByAdmin = async (teacherId: string, data: string, isVerified: boolean) => {
  const response = await api.post(`/admin/verify-teacher/${teacherId}`, { adminId: data, isVerified: isVerified })
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
