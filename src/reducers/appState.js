import { language } from '../locales'
import { utils } from 'tools'

const userMobileLanguage = utils.getUserMobileLanguage()
const initialState = {
  sidebarOpen: false,
  showPwdDialog: false,
  isLoading: false,
  loadingText: '',
  toast: {
    toasting: false,
    toastMsg: null,
    position: 'center',
    loading: false,
    style: {},
  },
  cancelUpgrade: false, //关闭不更新，则只有重新打开app才会弹窗提醒
  showUpgradeVersion: false, //显示更新版本modal
  showAnnouncement: false, //显示停服公告
  versionMsg: {}, //版本信息
  announcementMsg: {}, //公告信息
  userAssets: [], //用户资产
  language: language[userMobileLanguage],
  carousels: [], //轮播图数据,
  announcementText: '', //停服公告内容
  storeSearchParams: null,
  thirdCategoty: [], // 分类3
  productCategory: null,
  account_area: {
    en: 'China',
    es: 'China',
    zh_CN: '中国',
    locale: 'CN',
    code: 86,
  }
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

    case 'SIDEBAR_OPEN':
      return { ...state, sidebarOpen: true }

    case 'SIDEBAR_CLOSE':
      return { ...state, sidebarOpen: false }

    case 'SHOW_LOADING':
      return { ...state, isLoading: true, loadingText: action.value || void (0) }

    case 'HIDE_LOADING':
      return { ...state, isLoading: false }

    case 'CANCEL_UPGRADE':
      let val = action.data === undefined ? true : action.data
      return { ...state, cancelUpgrade: val }
    case 'SWITCH_VERSION_MODAL_STATUS':
      return { ...state, showUpgradeVersion: action.data }
    case 'SWITCH_ANNOUNCEMENT_MODAL_STATUS':
      return { ...state, showAnnouncement: action.data }
    case 'SET_VERSION_MSG':
      return { ...state, versionMsg: action.data }
    case 'SET_ANNOUNCEMENT_MSG':
      return { ...state, announcementMsg: action.data }  
    case 'SHOW_PWD_DIALOG':
      return { ...state, showPwdDialog: true }

    case 'HIDE_PWD_DIALOG':
      return { ...state, showPwdDialog: false }

    case 'SET_USER_ASSETS':
      return { ...state, userAssets: action.data }

    case 'IS_LOADING':
      return { ...state, isLoading: action.data }

    case 'SWITCH_LANGUAGE':
      return { ...state, language: language[action.data]}
    
    case 'SET_CAROUSELS':
      return { ...state, carousels: action.data }

    case 'SET_ANNOUNCEMENT_STATUS':
      return { ...state, showAnnouncement: action.data }
      
    case 'SET_ANNOUNCEMENT_TEXT':
      return { ...state, announcementText: action.data }

    case 'SET_STORE_SEARCH':
      return { ...state, storeSearchParams: action.data }

    case 'SET_THIRD_CATEGORY':
      return { ...state, thirdCategoty: action.data }

    case 'SAVE_PRODUCT_CATEGORY':
      return { ...state, productCategory: action.data }

    default:
      return state
  }
}
