import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import Header from 'components/header'
import IconFont from 'components/iconfont'
import { request } from 'apiRequest'
import styles from './index.scss'
class My extends React.Component {
  state = {
    subcount: {}
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
    const { subcount } = this.state
    return (
      <div>
        <div>
          <div>
            <IconFont cls='iconmore'></IconFont>
            <div>创建的歌单({subcount.createdPlaylistCount})</div>
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
    const test = await request.test()
    console.log(test)
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
