// 歌单 专辑 列表
import React from 'react'
import Iconfont from 'components/iconfont'
import CSSModules from 'react-css-modules'
import styles from './index.scss'
class CoverList extends React.Component {

  getPlayCount = (count) => {
    let palyCount = ''
    if (count > 100000000) {
      palyCount =  `${(count / 100000000).toFixed(1)}亿`
    } else if (count > 10000) {
      palyCount = `${(count / 10000).toFixed(1)}万`
    } 
    return palyCount
  }

  render () {
    const { data } = this.props
    return (
      <div styleName='item' onClick={this.props.onClick}>
        <img styleName='columnImg' src={data.picUrl} alt=""/>
        {
          data.playCount && 
          <div styleName='background_wrap'>
            <div styleName='shadow'>
              <Iconfont cls='iconbofang' styleName='icon'></Iconfont>
              {this.getPlayCount(data.playCount)}
            </div>
          </div>
        }
        <div styleName='name'>{data.name}</div>
      </div>
    )
  }

}

const Wrapper = CSSModules(CoverList, styles, {allowMultiple: true})
export default Wrapper
