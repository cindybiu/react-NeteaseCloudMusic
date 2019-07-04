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
class Play extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTime: 0,
      playProgress: 0,
      playStatus: false,
      currentPlayMode: 0,
    }
    this.currentSong={
      img: '',
      name: '',
      id: 0,
      scr: ''
    }
    this.currentIndex = 0
    this.isFirstPlay = true
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
      this.audioDOM.play()
      // this.startImgRotate()
      this.setState({
        playStatus: true
      })
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

  render () {
    this.currentIndex = this.props.currentIndex
    let song = new Object(this.currentSong)
    let playBg = song.img ? song.img : play_bg
    song.playStatus = this.state.playStatus
    return (
      <div styleName="player-container">
        <div styleName="player" ref="player" style={{display: this.props.showStatus === true ? 'block' : 'none'}}>
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
                  <Progress progress={this.state.playProgress} /> 
                </div>
                <span styleName="total-time">{getTime(song.duration)}</span>
              </div>


            </div>
          </div>
          <div styleName="player-bg" ref="playerBg" />
          <audio ref="audio"></audio>
        </div>
      </div>
    )
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
const Wrapper = CSSModules(Play, styles, { allowMultiple: true })
export default connect(mapStateToProps)(Wrapper)
