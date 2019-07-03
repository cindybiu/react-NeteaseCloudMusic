
const initialState = {
  userInfo: {},
  showStatus: false,  //显示状态
  song: {},  //当前歌曲
  songs: []  //歌曲列表
}

export default function superPlayer (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userInfo: action.data }
    case 'CLEAR_USERINFO':
      return { ...state, userInfo: {} }
    case 'SHOW_PLAYER':
      return { ...state, showStatus: action.showStatus }
    case 'CHANGE_SONG':
      return { ...state, song: action.song }
    case 'SET_SONGS':
      return { ...state, songs: action.songs}
    case 'REMOVE_SONG_FROM_LIST':
      return { ...state, songs: state.songs.filter(song => song.id !== action.id)}
    default:
      return state
  }
}