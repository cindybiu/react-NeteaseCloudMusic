/**  
 *  迷你播放框 
 */ 

import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import Iconfont from 'components/iconfont'
import Progress from 'components/progress'
import styles from './index.scss'
import musicImg from 'images/music.png'
class MiniPlayer extends React.Component {
  constructor (props) {
    super()
    this.state = {
    }
  }

  handlePlayOrPause = (e) => {
    e.stopPropagation()
    if (this.props.song.url) {
      //调用父组件的播放或暂停方法
      this.props.playOrPause()
    }
  }

  showPlayer = () => {
    if (this.props.song.url) {
      this.props.showPlayer()
    }
  }

  render () {
    const { song, showStatus, progress, playStatus } = this.props
    if (!song.img) {
      song.img = musicImg
    }
    return (
      <div styleName='miniPlayer-container' style={showStatus ?{display: 'none'}:{}} onClick={this.showPlayer}>
        <div styleName='progress-container'>
          <Progress disableButton={true} progress={progress} style={{width: '100%'}}/>
        </div>
        <div styleName='left'>
          <div styleName='head-img'><img src={song.img} alt={song.name}/></div>
          <div styleName='songInfo'>
            <div styleName='song'>{song.name}</div>
            <div styleName='singer'>{song.singer}</div>
          </div>
        </div>
        <div styleName='right'>
          <Iconfont cls={ playStatus ? 'iconzanting1' : 'iconbofang4' } styleName='playIcon'  onClick={this.handlePlayOrPause}></Iconfont>
          <Iconfont cls='iconliebiao1' styleName='listIcon'></Iconfont>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    showStatus: state.global.showStatus
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

const Wrapper = CSSModules(MiniPlayer, styles, {allowMultiple: true})
export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
