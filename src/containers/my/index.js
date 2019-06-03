import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import Header from 'components/header'
import IconFont from 'components/iconfont'
import styles from './index.scss'
class My extends React.Component {

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

  render () {
    return (
      <Fragment>
        <Header tabId={0}/>
        <div style={{paddingTop: '55px'}}>
          {this.renderTopList()}
        </div>
      </Fragment>
    )
  }
}


const Wrapper = CSSModules(My, styles, {allowMultiple: true})
export default Wrapper
