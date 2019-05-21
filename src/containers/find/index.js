import React from 'react'
import CSSModules from 'react-css-modules'
import Header from 'components/header'
import Slick from 'components/slick'
import styles from './index.scss'
import { request } from 'apiRequest'
import daily from 'images/daily.png'
import playlist from 'images/playlist.png'
import rank from 'images/rank.png'
import moment from 'moment'
import fm from 'images/fm.png'

class Find extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      banners: [],
      recommendSongs: []
    }
  }

  getPlayCount = (count) => {
    let palyCount = ''
    if (count > 100000000) {
      palyCount =  `${(count / 100000000).toFixed(1)}亿`
    } else if (count > 10000) {
      palyCount = `${(count / 10000).toFixed(1)}万`
    } 
    return palyCount
  }

  renderMenu () {
    return (
      <div styleName='menu_wraper'>
        <div styleName='item'>
          <img src={daily} alt=""/>
          <div styleName='title'>每日推荐</div>
          <div styleName='date'>{moment().format('D')}</div>
        </div>
        <div styleName='item'>
          <img src={playlist} alt=""/>
          <div styleName='title'>歌单</div>
        </div>
        <div styleName='item'>
          <img src={rank} alt=""/>
          <div styleName='title'>排行榜</div>
        </div>
        <div styleName='item'>
          <img src={fm} alt=""/>
          <div styleName='title'>电台</div>
        </div>
      </div>
    )
  }

  renderRecommendSongs () {
    const { recommendSongs } = this.state
    return (
      <div styleName='block_list_wraper'>
        <div styleName='list_tile'>
          <div styleName='title'>推荐歌单</div>
          <button styleName='button'>歌单广场</button>
        </div>
        <div styleName='main'>
          {
            recommendSongs && recommendSongs.slice(0, 6).map((item, index) => {
              return (
                <div key={index} styleName='item'>
                  <img styleName='columnImg' src={item.picUrl} alt=""/>
                  <div styleName='background_wrap'><div styleName='shadow'>{this.getPlayCount(item.playCount)}</div></div>
                  <span styleName='name'>{item.name}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  } 

  render () {
    return (
      <div>
        <Header/>
        <Slick imgs={this.state.banners}></Slick>
        {this.renderMenu()}
        {this.renderRecommendSongs()}
      </div>
    )
  }

  async componentDidMount () {
    const banners = await request.getBanner()
    const recommendSongs = await request.getPersonalized()
    this.setState({
      banners: banners.banners,
      recommendSongs: recommendSongs.result
    })
  }
}


const Wrapper = CSSModules(Find, styles, {allowMultiple: true})
export default Wrapper
