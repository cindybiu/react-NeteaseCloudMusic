/*  歌单详情页面 
 *  url: playlist/detail/:id 
 *  传入参数： id:歌曲id */ 

import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import PaygeLayout from 'components/paygeLayout'
import IconFont from 'components/iconfont'
import styles from './index.scss'
import { request } from 'apiRequest'
class PlaylistDetail extends React.Component {
  state = {
    playlistInfo: {}
  }

  bindScroll (e) {
    console.log(1111)
  }
  renderInfo () { // 歌单详情页上半部分
    const { playlistInfo } = this.state
    const button = [
      {cls: 'iconpinglun', title: playlistInfo.commentCount},
      {cls: 'iconfenxiang', title: playlistInfo.shareCount},
      {cls: 'iconxuanze-duoxuan', title: '多选'},
      {cls: 'iconxiazai1', title: '下载'},
    ]
    return (
      <div styleName='info_wraper'>
        <div styleName='main'>
          <div styleName='headImg'><img src={playlistInfo.coverImgUrl} alt=""/></div>
          <div styleName='right'>
            <div>
              <div styleName='title'>{playlistInfo.name&&playlistInfo.name}</div>
              <div styleName='avatar'>
                <div styleName='avatarImg'><img src={playlistInfo.creator && playlistInfo.creator.avatarUrl} alt=""/></div>
                <div>{playlistInfo.creator && playlistInfo.creator.nickname }</div>
                <IconFont cls='iconmore'></IconFont>
              </div>
            </div>
            <div styleName='description'>{playlistInfo.description}</div>
          </div>
        </div>
        <div styleName='infoButtom'>
          { button.map((item, index) => {
            return (
              <div key={index} style={{textAlign: 'center'}}>
                <div>
                  <IconFont cls={item.cls} styleName='icon'></IconFont>
                </div>
                <div styleName='title'>{item.title}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderPlaylist () { // 歌单详情页播放列表
    const { playlistInfo } = this.state
    return (
      <div styleName='playlist_wraper'>
        <div styleName='header'>
          <div styleName='left'>
            <IconFont cls='iconbofang2' styleName='icon'></IconFont>
            <div styleName='title'>全部播放<span>(共{playlistInfo.trackCount}首)</span></div>
          </div>
          <div>
            <button>
              <IconFont cls='icontianjia' styleName='icon'></IconFont>
              收藏({playlistInfo.subscribedCount})
            </button>
          </div>
        </div>
        { playlistInfo.tracks && playlistInfo.tracks.map((item, index) => {
          return (
            <div styleName='songsList' key={index}>
              <div>{index+1}</div>
              <div styleName='middle'>
                <div styleName='name'>{item.name}</div>
                <div styleName='singer'>{item.ar[0].name}-{item.al.name}</div>
              </div>
              <div>
                <IconFont cls='iconplay' styleName='icon'></IconFont>
                <IconFont cls='iconmore1' styleName='icon'></IconFont>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    const { playlistInfo } = this.state
    const rightContent = (
      <div>
        <IconFont cls='iconsousuo' styleName='icon'></IconFont>
        <IconFont cls='iconmore1'  styleName='icon'></IconFont>
      </div>
    )
    const title = (
      <div styleName='title_wraper'>
        <div style={{color: '#fff'}}>歌单</div>
        <div styleName='recommend'>编辑推荐：{playlistInfo.name&&playlistInfo.name}</div>
      </div>
    )
    return (
      <PaygeLayout headerStyles={{background: 'none', color: '#fff'}} rightContent={rightContent} title={title} customStyles={{paddingTop: '0px'}}>
        {this.renderInfo()}
        {this.renderPlaylist()}
      </PaygeLayout>
    )
  }

  async componentDidMount () {
    window.addEventListener('scroll', this.bindScroll)
    const playlistInfo = await request.getPlaylistDetail(this.props.match.params.id)
    this.setState({
      playlistInfo: playlistInfo.playlist
    })
  }
}


function mapStateToProps (state) {
  return {
  }
}


const Wrapper = CSSModules(PlaylistDetail, styles, {allowMultiple: true})
export default connect(mapStateToProps)(Wrapper)
