import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import Iconfont from 'components/iconfont'
import { Link } from 'react-router-dom'
import styles from './index.scss'

const type = [
  { name: '我的', tabId: 0, url: '/my' },
  { name: '发现', tabId: 1, url: '/'},
  { name: '朋友', tabId: 2, url: '/friends' },
  { name: '视频', tabId: 3, url: '/video' },
]
class Header extends React.Component {
  state = {
    showDrawer: false
  }

  hideDrawer = () => {
    this.setState({
      showDrawer: false
    })
  }
  renderHeader () {
    const { tabId } = this.props
    return (
      <div styleName='header_wraper'>
        <div styleName='left'>
          <Iconfont styleName='icon' cls='iconzhedie' onClick={(event) => {   
            event.nativeEvent.stopImmediatePropagation()
            this.setState({showDrawer: !this.state.showDrawer})
          } }></Iconfont>
        </div>
        <div styleName='middle'>
          {
            type.map((item, index) => {
              return (
                <Link to={`${item.url}`} key={index}> <div styleName={tabId===item.tabId? 'active':null}>{item.name}</div></Link>
             
              )
            })
          }
        </div>
        <div styleName='right'>
          <Iconfont  styleName='icon' cls='iconsousuo'></Iconfont>
        </div>
      </div>
    )
  }

  renderDrawer () {
    const { showDrawer } = this.state
    return (
      showDrawer && 
      <Fragment>
        <div styleName='drawer_wraper'>2222</div>
        <div></div>
      </Fragment>
    )
  }

  render () {
    return (
      <Fragment>
        { this.renderHeader() }
        { this.renderDrawer() }
      </Fragment>
     
    )
  }

  componentDidMount () {
    document.addEventListener('click', this.hideDrawer)
  }
}

const Wrapper = CSSModules(Header, styles, {allowMultiple: true})
export default Wrapper
