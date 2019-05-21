import React from 'react'
import './iconfont.css'

class Iconfont extends React.PureComponent {
  render () {
    const { cls = '', style = {}, className = '' } = this.props
    const clickFun = this.props.onClick || null
    return <i className={`iconfont ${cls} ${className}`} style={style} onClick={clickFun} />
  }
}

export default Iconfont
