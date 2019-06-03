
const initialState = {
  userInfo: {},
}

export default function superPlayer (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userInfo: action.data }
    case 'CLEAR_USERINFO':
      return { ...state, userInfo: {} }
    default:
      return state
  }
}