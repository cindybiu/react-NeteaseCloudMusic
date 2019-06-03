import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import styles from './index.scss'
import bannerImg from 'images/banner.jpg'
import { Link } from 'react-router-dom'
import IconFont from 'components/iconfont'

class Drawer extends React.Component {
  state = {
    showDrawer: this.props.open
  }

  hideDrawer = () => {
    this.props.hideDrawer(false)
    this.setState({
      showDrawer: false
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ showDrawer: nextProps.open })
  }

  renderHeader () {
    const { userInfo } = this.props
    // 头部登录信息
    return (
      <div styleName="header_wraper">
        {
          userInfo.id ?
            <Fragment>
              <div style={{width: '85%'}}>
                <div styleName='headImg'>
                  <img src={userInfo.avatarUrl} alt="head"/>
                </div>
                <div styleName='bottom'>
                  <div style={{display: 'flex'}}> {userInfo.nickname}
                    <div styleName='level'>Lv.{userInfo.level}</div>
                  </div>
                
                  <button styleName='sign'><IconFont cls='iconjifen' styleName='icon'></IconFont>签到</button>
                </div>
              </div>
            </Fragment>
            :
            <Fragment>
              <span>登录网易云音乐</span>
              <span>手机电脑多端同步，尽享海量高品质音乐</span>
              <Link to={`/login`}> <button>立即登录</button></Link>
            </Fragment>
        }
        
        {this.renderBanner()}
      </div>
    )
  }

  renderBanner () {

    return (
      <div styleName="banner_wraper">
        <div>
          <div styleName="title">开通黑胶VIP</div>
          <div>新客仅8元</div>
        </div>
        <div styleName="line" />
        <div styleName="banner_right">
          <div>黄明昊全新单曲</div>
          <div styleName="bannerImg">
            <img src={bannerImg} alt="" />
          </div>
        </div>
      </div>
    )
  }

  renderMenu () {
    const data = [
      {cls: 'iconxiaoxi', title: '我的消息'},
      {cls: 'iconuser1', title: '我的好友'},
      {cls: 'iconpifu', title: '个性换肤'},
      {cls: 'iconicon_microphone', title: '听歌识曲'},
    ]
    return (
      <div styleName="menu_wraper">
        { data.map((item, index) => {
          return (
            <div styleName="item" key={index}>
              <IconFont cls={item.cls} styleName='icon'></IconFont>
              <div styleName="title">{item.title}</div>
            </div>
          )
        })}
      </div>
    )
  }

  renderMyOption () {
    const data = [
      {cls: 'icondingwei', title: '附近的人'},
      {cls: 'icondingshi_l', title: '定时停止播放'},
      {cls: 'iconsaoyisao', title: '扫一扫'},
      {cls: 'iconN-naozhong', title: '音乐闹钟'},
      {cls: 'iconhuatong', title: '我要开播'}
    ]
    return (
      <div styleName='option_wraper'>
        {data.map((item, index) => {
          return (
            <div key={index} styleName='list'>
              <IconFont cls={item.cls} styleName='icon'></IconFont>
              <div>{item.title}</div>
            </div>
          )
        })}
      </div>
    )
  }

  renderButton () {
    const data = [
      {cls: 'iconyueliang', title: '夜间模式'},
      {cls: 'iconshezhi', title: '设置'},
      {cls: 'icontuichu', title: '退出', url: '/login'},
    ]
    return (
      <div styleName='buttom_wraper'>
        {data.map((item, index) => {
          return (
            <div key={index} styleName='list' onClick={() => {
              item.url && this.props.history.push(item.url)
            }}>
              <IconFont cls={item.cls} styleName='icon'></IconFont>
              <div>{item.title}</div>
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    const { showDrawer } = this.state
    return (
      <Fragment>
        <div
          styleName={`drawer_wraper ${showDrawer ? 'drawer_open' : ''}`}
          onClick={event => event.nativeEvent.stopImmediatePropagation()}
        >
          {this.renderHeader()}
          {this.renderMenu()}
          {this.renderMyOption()}
          {this.renderButton()}
        </div>
        {showDrawer && (
          <div
            styleName="drawer_overlay"
            style={{ opacity: 1, visibility: 'visible' }}
          />
        )}
      </Fragment>
    )
  }

  componentDidMount () {
    document.addEventListener('click', this.hideDrawer)
  }
}

function mapStateToProps (state) {
  return {
    userInfo: state.global.userInfo
  }
}


const Wrapper = CSSModules(Drawer, styles, { allowMultiple: true })
export default compose(withRouter, connect(mapStateToProps))(Wrapper)
