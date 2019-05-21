import React from 'react'
import CSSModules from 'react-css-modules'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Iconfont from 'components/iconfont'
import styles from './index.scss'
class Header extends React.Component {

  render () {
    return (
      <div styleName='header_wraper'>
        <div styleName='left'>
          <Iconfont styleName='icon' cls='iconzhedie'></Iconfont>
        </div>
        <div styleName='middle'>
          <div>我的</div>
          <div styleName='active'>发现</div>
          <div>朋友</div>
          <div>视频</div>
        </div>
        <div styleName='right'>
          <Iconfont  styleName='icon' cls='iconsousuo'></Iconfont>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.appState.language
  }
}

const Wrapper = CSSModules(Header, styles, {allowMultiple: true})
export default compose(connect(mapStateToProps))(Wrapper)
