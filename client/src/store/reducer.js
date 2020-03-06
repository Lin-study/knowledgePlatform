import { combineReducers } from 'redux-immutable'
// import a, { reducer as navReducer } from ''
import Nav from '../components/Nav/store';
const reducer = combineReducers({
  nav: Nav.reducer
})

export default reducer