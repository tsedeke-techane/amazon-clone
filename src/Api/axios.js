import axios from "axios"

const axiosInstance = axios.create({
    // baseURL:"http://127.0.0.1:5001/clone-2b5b0/us-central1/api"
    baseURL:"https://amazon-api-deploy-c1w0.onrender.com/"
    // baseURL:"http://localhost:5000/"
})


export {axiosInstance}