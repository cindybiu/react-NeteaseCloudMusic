/**  
 *  迷你播放框 
 */ 

import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import styles from './index.scss'
class MiniPlayer extends React.Component {
  constructor (props) {
    super()
    this.state = {
    }
  }

  render () {
    const { currentSong } = this.props
    console.log(currentSong)
    return (
      <div styleName='miniPlayer-container'>
        <div styleName='left'>
          <div styleName='head-img'><img src={currentSong.img} alt={currentSong.name}/></div>
          <div styleName='songInfo'>
            <div styleName='song'>{currentSong.name}</div>
            <div styleName='singer'>{currentSong.singer}</div>
          </div>
        </div>
        <div>
          right
        </div>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    currentSong: state.global.song,
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}


const Wrapper = CSSModules(MiniPlayer, styles, {allowMultiple: true})
export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
