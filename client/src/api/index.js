import axios from 'axios'
export default {
  getTree : () => {
    return axios.get('/api/getTree')
  },
  getBook: (path) => {
    return axios.post('/api/getBook', {path})
  }
}