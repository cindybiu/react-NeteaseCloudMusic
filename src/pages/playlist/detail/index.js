/*  歌单详情页面 
 *  url: playlist/detail/:id 
 *  传入参数： id:歌曲id 
 * **/ 

import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import PaygeLayout from 'components/paygeLayout'
import IconFont from 'components/iconfont'
import styles from './index.scss'
import { request } from 'apiRequest'
import { actions } from 'actions'
class PlaylistDetail extends React.Component {
  constructor (props) {
    super()
    this.state = {
      playlistInfo: {},
      songs: []
    }
    // this.songs = []
  }
 


  filterMusic = (data) => { // 对接口数据进行处理
    const music = {
      duration: data.dt / 1000,
      id: data.id,
      img: data.al.picUrl,
      name: data.name,
      singer: data.ar[0].name,
      url: `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`
    }
    return music
  }

  palyMusic = async (item) => {
    const { setSongs, changeCurrentSong, showMusicPlayer } = this.props
    const song = this.filterMusic(item)
    setSongs([song])
    changeCurrentSong(song)
    showMusicPlayer(true)
  }

  playAll = () => {
    console.log('------播放全部')
    const { tracks } = this.state.playlistInfo
    const { setSongs, changeCurrentSong, showMusicPlayer } = this.props
    let songs = [] // 数据处理过后的全部歌曲
    tracks.map(item => {
      const data = this.filterMusic(item)
      return  songs.push(data) 
    })
    if ( songs.length > 0 ) {
      // 添加播放歌曲列表
      setSongs(songs)
      changeCurrentSong(songs[0])
      showMusicPlayer(true)
    }
  }

  renderInfo () { // 歌单详情页上半部分
    const { playlistInfo } = this.state
    const button = [
      {cls: 'iconpinglun', title: playlistInfo.commentCount},
      {cls: 'iconfenxiang', title: playlistInfo.shareCount},
      {cls: 'iconxuanze-duoxuan', title: '多选'},
      {cls: 'iconxiazai1', title: '下载'},
    ]
    return (
      <div styleName='info_wraper'>
        <div styleName='main'>
          <div styleName='headImg'><img src={playlistInfo.coverImgUrl} alt=""/></div>
          <div styleName='right'>
            <div>
              <div styleName='title'>{playlistInfo.name&&playlistInfo.name}</div>
              <div styleName='avatar'>
                <div styleName='avatarImg'><img src={playlistInfo.creator && playlistInfo.creator.avatarUrl} alt=""/></div>
                <div>{playlistInfo.creator && playlistInfo.creator.nickname }</div>
                <IconFont cls='iconmore'></IconFont>
              </div>
            </div>
            <div styleName='description'>{playlistInfo.description}</div>
          </div>
        </div>
        <div styleName='infoButtom'>
          { button.map((item, index) => {
            return (
              <div key={index} style={{textAlign: 'center'}}>
                <div>
                  <IconFont cls={item.cls} styleName='icon'></IconFont>
                </div>
                <div styleName='title'>{item.title}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderPlaylist () { // 歌单详情页播放列表
    const { playlistInfo } = this.state
    return (
      <div styleName='playlist_wraper'>
        <div styleName='header'>
          <div styleName='left'>
            <IconFont cls='iconbofang2' styleName='icon'></IconFont>
            <div styleName='title' onClick={this.playAll}>全部播放<span>(共{playlistInfo.trackCount}首)</span></div>
          </div>
          <div>
            <button>
              <IconFont cls='icontianjia' styleName='icon'></IconFont>
              收藏({playlistInfo.subscribedCount})
            </button>
          </div>
        </div>
        { playlistInfo.tracks && playlistInfo.tracks.map((item, index) => {
          return (
            <div styleName='songsList' key={index} onClick={this.palyMusic.bind(this, item)}>
              <div>{index+1}</div>
              <div styleName='middle'>
                <div styleName='name'>{item.name}</div>
                <div styleName='singer'>{item.ar[0].name}-{item.al.name}</div>
              </div>
              <div>
                <IconFont cls='iconplay' styleName='icon'></IconFont>
                <IconFont cls='iconmore1' styleName='icon'></IconFont>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    const { playlistInfo } = this.state
    const rightContent = (
      <div>
        <IconFont cls='iconsousuo' styleName='icon'></IconFont>
        <IconFont cls='iconmore1'  styleName='icon'></IconFont>
      </div>
    )
    const title = (
      <div styleName='title_wraper'>
        <div style={{color: '#fff'}}>歌单</div>
        <div styleName='recommend'>编辑推荐：{playlistInfo.name&&playlistInfo.name}</div>
      </div>
    )
    return (
      <PaygeLayout headerStyles={{background: 'none', color: '#fff'}} rightContent={rightContent} title={title} customStyles={{paddingTop: '0px'}}>
        {this.renderInfo()}
        {this.renderPlaylist()}
      </PaygeLayout>
    )
  }
  
  clickHandler () {
    console.log('11111111')
  }
  
  async componentDidMount () {
    window.addEventListener('scroll', this.clickHandler)
    const { showLoading, hideLoading } = this.props
    showLoading()
    const playlistInfo = await request.getPlaylistDetail(this.props.match.params.id)
    this.setState({
      playlistInfo: playlistInfo.playlist
    })
    hideLoading()
  }
}


function mapStateToProps (state) {
  return {
  
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSongs: (data) => dispatch(actions.setSongs(data)),
    changeCurrentSong: (data) => dispatch(actions.changeSong(data)),
    showMusicPlayer: (data) => dispatch(actions.showPlayer(data)),
    showLoading: () => dispatch(actions.showLoading()),
    hideLoading: () => dispatch(actions.hideLoading())
  }
}


const Wrapper = CSSModules(PlaylistDetail, styles, {allowMultiple: true})
export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
