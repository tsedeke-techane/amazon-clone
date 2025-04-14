import axios from "axios"

const axiosInstance = axios.create({
    // baseURL:"http://127.0.0.1:5001/clone-5c16b/us-central1/api"
    baseURL:"https://amazon-api-deploy-2fpe.onrender.com/"
    // baseURL:"http://localhost:5000/"
})

export {axiosInstance}