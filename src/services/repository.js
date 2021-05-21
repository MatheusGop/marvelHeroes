import axios from 'axios'
import constants from './constants'

const baseURL = constants.API_URL

let axiosApi = axios.create({
    baseURL
  }, 20000)

export default axiosApi