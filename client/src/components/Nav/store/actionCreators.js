import * as constants from './constants'
import api from 'api'

export const getTree = () => {
  return (dispatch) => {
		api.getTree().then((res) => {
      console.log(res)
			// if (result) {
			// 	dispatch(changeLogin())
			// }else {
			// 	alert('登陆失败')
			// }
		})
	}
}