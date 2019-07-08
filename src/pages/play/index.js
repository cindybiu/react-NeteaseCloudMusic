/*  歌曲播放页面
 * **/

import React from 'react'
import CSSModules from 'react-css-modules'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import play_bg from 'images/play_bg.jpg'
import styles from './index.scss'
import IconFont from 'components/iconfont'
import Progress from 'components/progress'
import MiniPlayer from './miniPlayer'
import { actions } from 'actions'
import { utils } from 'tools'

class Play extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTime: 0,
      playProgress: 0,
      playStatus: false,
      currentPlayMode: 0,
      route: false //是否旋转
    }
    this.currentSong={
      img: '',
      name: '',
      id: 0,
      scr: ''
    }
    this.currentIndex = 0
    this.isFirstPlay = true
    this.dragProgress = 0 //拖拽进度
    this.palyModes = ['list', 'single', 'shuffle'] // 播放模式
    this.palymodesIcon = {
      'list': 'iconliebiaoxunhuan1',
      'single': 'icondanquxunhuan1',
      'shuffle': 'iconsuijibofang_'
    }
  }

  /**
   * 隐藏播放页面
   */
  hidePlayer = () => {
    this.props.showMusicPlayer(false)
  }
  /**
   * 开始拖拽
   */
  handleDrag = (progress) => {
    this.dragProgress = progress
  }
  /**
   * 歌曲图片旋转
   */
  imgRotate = (boolean) => {
    this.setState({ route: boolean })
  }
  /**
   * 结束拖拽
   */
  handleDragEnd = () => {
    let currentTime = this.audioDOM.duration * this.dragProgress
    this.setState({
      playProgress: this.dragProgress,
      currentTime
    }, () => {
      this.audioDOM.currentTime = currentTime
      this.playStatus(true)
      this.dragProgress = 0
    })
  }
  /**
   * 播放状态控制
   */
  playStatus = (boolean) => {
    if (boolean) {
      this.audioDOM.play()
      this.imgRotate(true)
      this.setState({ playStatus: true })
    } else {
      this.audioDOM.pause()
      this.imgRotate(false)
      this.setState({ playStatus: false })
    }
  }
  /**
   * 暂停和播放
   */
  playOrPause = () => {
    this.audioDOM.paused ? this.playStatus(true) : this.playStatus(false) 
  }
  /**
   * 控制播放模式
   */
  changePlayMode = () => {
    const { currentPlayMode } = this.state
    if ( currentPlayMode === this.palyModes.length-1 ) {
      this.setState({ currentPlayMode: 0 })
    } else {
      this.setState({  currentPlayMode: currentPlayMode+1})
    }
  }
  /**
   * 上一首
   */
  previous = () => {
    const { playSongs, changeCurrentSong } = this.props
    const { currentPlayMode } = this.state
    let currentIndex = this.currentIndex
    if (playSongs.length > 1) {
      switch (currentPlayMode) {
        case 0: // 列表播放
          currentIndex === 0 ? currentIndex = playSongs.length - 1 : currentIndex = currentIndex - 1 
          break
        case 1: // 单曲循环
          currentIndex = this.currentIndex
          break
        case 2: // 随机播放
          let index = parseInt(Math.random() * playSongs.length, 10)
          currentIndex = index
          break
        default: 
          return
      }
      changeCurrentSong(playSongs[currentIndex])
      this.currentIndex = currentIndex
    }
  }
  /**
   * 下一首
   */
  next = () => {
    const { playSongs, changeCurrentSong } = this.props
    const { currentPlayMode } = this.state
    let currentIndex = this.currentIndex
    if (playSongs.length > 1) {
      switch (currentPlayMode) {
        case 0: // 列表播放
          currentIndex === playSongs.length - 1 ? currentIndex = 0 : currentIndex = currentIndex + 1 
          break
        case 1: // 单曲循环
          currentIndex = this.currentIndex
          break
        case 2: // 随机播放
          let index = parseInt(Math.random() * playSongs.length, 10)
          currentIndex = index
          break
        default: 
          return
      }
      changeCurrentSong(playSongs[currentIndex])
      this.currentIndex = currentIndex
    }
  }
  render () {
    const { route } = this.state
    let song = Object.assign(this.currentSong)
    let playBg = song.img ? song.img : play_bg
    let playButtonClass = this.state.playStatus ? "iconzanting1" : "iconbofang4"
    song.playStatus = this.state.playStatus
    const iconData = [
      {cls: this.palymodesIcon[this.palyModes[this.state.currentPlayMode]], fontSize: '23px', click: this.changePlayMode},
      {cls: 'iconshangyishoushangyige1', fontSize: '23px', click: this.previous},
      {cls: playButtonClass, fontSize: '40px', click: this.playOrPause},
      {cls: 'iconxiayigexiayishou1', fontSize: '23px', click: this.next},
      {cls: 'iconbianjiqiwuxuliebiao', fontSize: '23px'},
    ]
    return (
      <div styleName="player-container">
        <div styleName="player" ref="player" style={{display: this.props.showStatus ? 'block' : 'none'}}>
          <div styleName='header'>
            <span styleName="header-back" onClick={this.hidePlayer}>
              <IconFont cls='iconfanhui'></IconFont>
            </span>
            <div styleName="header-middle">
              <div> {song.name}</div>
              <div style={{color: '#e0e0e0', fontSize: '12px'}}>{song.singer}</div>
            </div>
          </div>
          <div styleName="singer-middle">
            <div styleName="singer-img" ref="singerImg">
              <img
                styleName={route ? 'rotate': ''}
                src={playBg}
                alt={song.name}
                onLoad={e => {
                  /*图片加载完成后设置背景，防止图片加载过慢导致没有背景*/
                  this.playerBgDOM.style.backgroundImage = `url("${playBg}")`
                }}
              />
            </div>
          </div>

          <div styleName="singer-bottom">
            <div styleName="controller-wrapper">

              <div styleName="progress-wrapper"> 
                {/* 时间进度条 */}
                <span styleName="current-time">{utils.getTime(this.state.currentTime)}</span>
                <div styleName="play-progress">
                  <Progress progress={this.state.playProgress} onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} /> 
                </div>
                <span styleName="total-time">{utils.getTime(song.duration)}</span>
              </div>

              <div styleName='play-wrapper'>
                {/* 歌曲控制 */}
                { iconData.map((e, index) => {
                  return (
                    <div key={index}>
                      <IconFont cls={e.cls} style={{fontSize: e.fontSize}} onClick={e.click}></IconFont>
                    </div> 
                  )
                })}
              </div>

            </div>
          </div>
          <div styleName="player-bg" ref="playerBg" />
          <audio ref="audio"></audio>
        </div>

        <MiniPlayer></MiniPlayer>
      </div>
    )
  }

  componentDidMount () {
    this.playerBgDOM = ReactDOM.findDOMNode(this.refs.playerBg)
    this.audioDOM = ReactDOM.findDOMNode(this.refs.audio)
    if (this.props.currentSong && this.props.currentSong.url) {
      //当前歌曲发发生变化
      if (this.currentSong.id !== this.props.currentSong.id) {
        this.currentSong = this.props.currentSong
        this.audioDOM.src = this.currentSong.url
        //加载资源，ios需要调用此方法
        this.audioDOM.load()
      }
    }
    this.audioDOM.addEventListener('canplay', () => {
      this.playStatus(true)
    }, false)

    this.audioDOM.addEventListener('timeupdate', () => {
      if (this.state.playStatus === true) {
        this.setState({
          playProgress: this.audioDOM.currentTime / this.audioDOM.duration,
          currentTime: this.audioDOM.currentTime
        })
      }
    }, false)

    this.audioDOM.addEventListener("ended", () => { 
      const { playSongs, } = this.props
      const { currentPlayMode } = this.state
      if ( playSongs.length > 1 ) {
        this.next()
      } else {
        switch ( currentPlayMode ) {
          case 0: //继续播放当前歌曲
            this.audioDOM.play()
            break 
          default: // 暂停
            this.playStatus(false)
        }
      }
    }, false)

    this.audioDOM.addEventListener('error', () => { alert("加载歌曲出错！") }, false)
  }

  componentDidUpdate () {
    //兼容手机端canplay事件触发后第一次调用play()方法无法自动播放的问题
    if (this.isFirstPlay === true) {
      this.audioDOM.play()
      this.isFirstPlay = false
    }
  }
}

function mapStateToProps (state) {
  return {
    currentSong: state.global.song,
    playSongs: state.global.songs,
    showStatus: state.global.showStatus
  }
}
function mapDispatchToProps (dispatch) {
  return {
    showMusicPlayer: (data) => dispatch(actions.showPlayer(data)),
    changeCurrentSong: (data) => dispatch(actions.changeSong(data)),
  }
}

const Wrapper = CSSModules(Play, styles, { allowMultiple: true })
export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
