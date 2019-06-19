import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import Header from 'components/header'
import Slick from 'components/slick'
import ListItem from 'components/listItem'
import IconFont from 'components/iconfont'
import CoverList from 'components/coverList'
import styles from './index.scss'
import { request } from 'apiRequest'
import moment from 'moment'
// import daily from 'images/daily.png'
// import playlist from 'images/playlist.png'
// import rank from 'images/rank.png'
// 
// import fm from 'images/fm.png'

class Find extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      banners: [],
      recommendSongs: [],
      album: [],
      djprogram: []
    }
  }

  renderMenu () {
    const list = [
      { cls: 'iconcalendar-blank', title: '每日推荐'},
      { cls: 'iconic_library_music', title: '歌单'},
      { cls: 'iconic_ranking', title: '排行榜'},
      { cls: 'iconradio', title: '电台'},
    ]
    return (
      <div styleName='menu_wraper'>
        {
          list.map((item, index) => {
            return (
              <div key={index} styleName='item'>
                <div styleName='iconBg'>
                  <IconFont cls={item.cls} styleName='icon'></IconFont>
                  {item.title === '每日推荐' && <div styleName='date'>{moment().format('D')}</div>}
                </div>
                <div>{item.title}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  renderRecommendSongs () {
    const { recommendSongs } = this.state
    const left = ( <div styleName='title'>推荐歌单</div> )
    const right = ( <button styleName='button'>歌单广场</button> )
    return (
      <div styleName='block_list_wraper'>
        <ListItem leftContent={left} rightContent={right}></ListItem>
        <div styleName='main'>
          {
            recommendSongs && recommendSongs.slice(0, 6).map((item, index) => {
              return (
                <CoverList data={item} key={index}></CoverList>
              )
            })
          }
        </div>
      </div>
    )
  } 

  renderNewAlbum () {
    const { album } = this.state
    const left = (
      <Fragment>
        <div styleName='title'>新碟</div>
        <div styleName='line'>|</div>
        <div styleName='sub_title'>新歌</div>
      </Fragment>
    )
    const right = ( <button styleName='button'>更多新碟</button> )
    return (
      <div styleName='block_list_wraper'>
        <ListItem leftContent={left} rightContent={right}></ListItem>
        <div styleName='main'>
          {
            album && album.slice(0, 3).map((item, index) => {
              return (
                <CoverList data={item} key={index}></CoverList>
              )
            })
          }
        </div>
      </div>
    )
  }

  renderDjprogram () {
    const { djprogram } = this.state
    const left = (
      <Fragment>
        <div styleName='title'>主播电台</div>
        <IconFont cls='iconmore' styleName='title'></IconFont>
      </Fragment>
    )
    const right = (<IconFont cls='iconmore1' style={{fontSize: '19px'}}></IconFont>)
    return (
      <div styleName='block_list_wraper'>
        <ListItem leftContent={left} rightContent={right}></ListItem>
        <div styleName='main'>
          {
            djprogram && djprogram.slice(0, 3).map((item, index) => {
              return (
                <CoverList data={item} key={index}></CoverList>
              )
            })
          }
        </div>
      </div>
    )
  }

  render () {
    return (
      <Fragment>
        <Header tabId={1}/>
        <div style={{paddingTop: '55px'}}>
          <Slick imgs={this.state.banners}></Slick>
          {this.renderMenu()}
          {this.renderRecommendSongs()}
          {this.renderNewAlbum()}
          {this.renderDjprogram()}
        </div>
      </Fragment>
    )
  }

  async componentDidMount () {
    const banners = await request.getBanner()
    const recommendSongs = await request.getPersonalized()
    const album = await request.getAlbum()
    const djprogram = await request.getDjprogram()
    this.setState({
      banners: banners.banners,
      recommendSongs: recommendSongs.result,
      album: album.albums,
      djprogram: djprogram.result
    })
  }
}


const Wrapper = CSSModules(Find, styles, {allowMultiple: true})
export default Wrapper
