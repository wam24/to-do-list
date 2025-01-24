import axios from "axios"

const apiWithCredentials = axios.create({
    baseURL: import.meta.env.VITE_APP_PUBLIC_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
    }
})
const apiWithoutCredentials = axios.create({
    baseURL: import.meta.env.VITE_APP_PUBLIC_API_URL,
})
export {apiWithoutCredentials, apiWithCredentials}