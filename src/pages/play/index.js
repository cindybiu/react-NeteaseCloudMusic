/*  歌曲播放页面
 *  url: playlist/detail/:id 
 *  传入参数： id:歌曲id 
 * **/ 

import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import styles from './index.scss'
class Play extends React.Component {
  state = {}
  render () {
    return (
      <div>1111111</div>
    )
  }
}


function mapStateToProps (state) {
  return {
  }
}
const Wrapper = CSSModules(Play, styles, {allowMultiple: true})
export default connect(mapStateToProps)(Wrapper)
