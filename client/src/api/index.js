import axios from 'axios'
export default {
  getTree : () => {
    return axios.get('/getTree')
  }
}