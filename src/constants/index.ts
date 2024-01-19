import axios from "axios";

import store from "../store";

// store.subscribe(listener)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// async function select(state: any) {
//   return state.auth?.user?.token;
// }

// async function listener() {
//   const token = await select(store.getState())
//   console.log(token)
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   }
// }

export const BASE_URL = 'http://localhost:3003/api'

function getTokenFromStorage() {
  const persistedState = localStorage.getItem('persist:root') || null;
  if (persistedState) {
    const parsedState = JSON.parse(persistedState);
    const authState = JSON.parse(parsedState.auth);
    const userState = authState.user;

    const { token } = userState;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

getTokenFromStorage()

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})


const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
  version: "2.18.0",
};

export { INITIAL_DATA, api }