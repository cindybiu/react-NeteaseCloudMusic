
const initialState = {
  isLoading: false,
  loadingText: '',
  toast: {
    toasting: false,
    toastMsg: null,
    position: 'center',
    loading: false,
    style: {},
  },
}

export default function appState (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_TOAST':
      return {
        ...state,
        toast: {
          ...initialState.toast,
          ...action.payload,
          toasting: true
        }
      }

    case 'HIDE_TOAST':
      return {
        ...state,
        toast: {
          ...initialState.toast
        }
      }
    case 'SHOW_LOADING':
      return { ...state, isLoading: true, loadingText: action.value || void (0) }

    case 'HIDE_LOADING':
      return { ...state, isLoading: false }
    case 'IS_LOADING':
      return { ...state, isLoading: action.data }

    default:
      return state
  }
}
