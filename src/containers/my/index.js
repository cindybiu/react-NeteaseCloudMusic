import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import Header from 'components/header'
import IconFont from 'components/iconfont'
import { request } from 'apiRequest'
import styles from './index.scss'
class My extends React.Component {
  state = {
    subcount: {},
    isOpen: true
  }

  openPlayList = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  renderTopList () {
    const list = [
      { cls: 'iconround-radio-px', title: '私人FM'},
      { cls: 'iconlist-unordered', title: '最新电音'},
      { cls: 'iconyejianmoshi', title: 'Sati空间'},
      { cls: 'iconaixinfengxian', title: '私藏推荐'},
    ]
    return (
      <div styleName='topList_wraper'>
        {
          list.map((item, index) => {
            return (
              <div key={index} styleName='item'>
                <div styleName='iconBg'>
                  <IconFont cls={item.cls} styleName='icon'></IconFont>
                </div>
                <div>{item.title}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  renderMenu () {
    const { subcount } = this.state
    const list = [
      { title: '本地音乐', cls: 'iconyinle2', number: 0 },
      { title: '本地播放', cls: 'iconbofang1', number: 0 },
      { title: '下载管理', cls: 'iconxiazai', number: 0 },
      { title: '我的电台', cls: 'iconyinle', number: subcount.djRadioCount || 0},
      { title: '我的收藏', cls: 'iconshoucang', number: (subcount.artistCount + subcount.newProgramCount) || 0},
    ]
    return (
      <div styleName='menu_wraper'>
        {list.map((item, index) => {
          return (
            <div key={index} styleName='item'>
              <IconFont cls={item.cls}></IconFont>
              <div styleName='right'>
                <div>{item.title}</div>
                <div styleName='number'>({item.number})</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  renderMyPlaylist () {
    const { subcount, isOpen } = this.state
    return (
      <div styleName='playList_wraper'>
        <div styleName='item_head'>
          <div styleName='left' onClick={this.openPlayList}>
            <IconFont cls={`${isOpen ?'iconarrow-down':'iconmore' }`}></IconFont>
            <div styleName='title'>创建的歌单
              <span  styleName='total'>{`(${subcount.createdPlaylistCount || 0 })`}</span>
            </div>
          </div>
          <div>
            <IconFont cls='iconmore1'></IconFont>
          </div>
        </div>

        <div styleName={`drawer_wraper ${isOpen? '' : 'close'}`}>
          <div styleName='info_left'>
            <div styleName='bg'>
              <IconFont cls='iconaixin' styleName='icon'></IconFont>
            </div>
            <div>
              <div styleName='title'>我喜欢的音乐</div>
              <div styleName='total'>0首</div>
            </div>
          </div>
          <div>
            <button>
              <IconFont cls='iconaixinfengxian1' ></IconFont>
              <span>心动模式</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <Fragment>
        <Header tabId={0}/>
        <div styleName='page_wraper'>
          {this.renderTopList()}
          {this.renderMenu()}
          {this.renderMyPlaylist()}
        </div>
      </Fragment>
    )
  }

  async componentDidMount () {
    const { userInfo } = this.props
    const subcount = await request.getUserSubcount(userInfo.id)
    this.setState({
      subcount
    })
  }
}


function mapStateToProps (state) {
  return {
    userInfo: state.global.userInfo
  }
}


const Wrapper = CSSModules(My, styles, {allowMultiple: true})
export default connect(mapStateToProps)(Wrapper)
