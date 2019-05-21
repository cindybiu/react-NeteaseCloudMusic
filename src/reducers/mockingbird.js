import { utils } from 'tools'

const userMobileLanguage = utils.getUserMobileLanguage()

const initialState = {
  isFirstIn: true,
  userInfo: {},
  locale: userMobileLanguage,
  account_area: {
    en: 'China',
    es: 'China',
    zh_CN: '中国',
    locale: 'CN',
    code: 86,
  }
}

export default function mockingbird (state = initialState, action) {
  switch (action.type) {
    case 'SET_ACCOUNT_AREA':
      return { ...state, account_area: action.data}
    case 'PAY_PASSWORD':
      return { ...state, payPassword: action.data }
    default:
      return state
  }
}