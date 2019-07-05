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
import { actions } from 'actions'
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
  }

  hidePlayer = () => { // 隐藏播放页面
    this.props.showMusicPlayer(false)
  }

  handleDrag = (progress) => { // 开始拖拽
    this.dragProgress = progress
  }
  
  imgRotate = (boolean) => {
    this.setState({
      route: boolean
    })
  }

  handleDragEnd = () => { // 结束拖拽
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

  playStatus = (boolean) => { // 播放状态控制
    if (boolean) {
      this.audioDOM.play()
      this.imgRotate(true)
      this.setState({
        playStatus: true
      })
    } else {
      this.audioDOM.pause()
      this.imgRotate(false)
      this.setState({
        playStatus: false
      })
    }
  }

  playOrPause = () => { // 暂停或播放
    this.audioDOM.paused ? this.playStatus(true) : this.playStatus(false) 
  }

  render () {
    const { route } = this.state
    this.currentIndex = this.props.currentIndex
    let song = new Object(this.currentSong)
    let playBg = song.img ? song.img : play_bg
    let playButtonClass = this.state.playStatus ? "iconzanting1" : "iconbofang4"
    song.playStatus = this.state.playStatus

    const iconData = [
      {cls: 'iconbianjiqiwuxuliebiao', fontSize: '23px'},
      {cls: 'iconshangyishoushangyige1', fontSize: '23px', click: this.previous},
      {cls: playButtonClass, fontSize: '40px', click: this.playOrPause},
      {cls: 'iconxiayigexiayishou1', fontSize: '23px'},
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
                <span styleName="current-time">{getTime(this.state.currentTime)}</span>
                <div styleName="play-progress">
                  <Progress progress={this.state.playProgress} onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} /> 
                </div>
                <span styleName="total-time">{getTime(song.duration)}</span>
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
  }

  componentDidUpdate () {
    //兼容手机端canplay事件触发后第一次调用play()方法无法自动播放的问题
    if (this.isFirstPlay === true) {
      this.audioDOM.play()
      this.isFirstPlay = false
    }
  }
}


function getTime (second) {
  second = Math.floor(second)
  let minute = Math.floor(second / 60)
  second = second - minute * 60
  return minute  + ":" + formatTime(second)
}
function formatTime (time) {
  let timeStr = "00"
  if (time > 0 && time < 10) {
    timeStr = "0" + time
  } else if (time >= 10) {
    timeStr = time
  }
  return timeStr
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
  }
}

const Wrapper = CSSModules(Play, styles, { allowMultiple: true })
export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
