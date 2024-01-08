import axios from 'axios'
import { BASE_URL } from '../constants'

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

export const signUp = async (path: string, data) => {
  const response = await axios.post(BASE_URL + `/${path}`, data, config)
  return response.data
}

export const logIn = async (path: string, data) => {
  const response = await axios.post(BASE_URL + `/${path}/login`, data, config)
  return response.data
}

export const get = async (id: string) => {
  const response = await axios.post(BASE_URL + `/${id}`, config)
  return response.data
}
