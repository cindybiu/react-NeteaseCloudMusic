// 首页 banner  
import React from 'react'
import CSSModules from 'react-css-modules'
import Slider from 'react-slick'
import styles from './index.scss'
class Slick extends React.Component {
  render () {
    const { imgs } = this.props
    const defaultSettings = {
      // autoplay: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false, //去掉前后箭头
      dotsClass: `slick-dots ${this.props.styles['custom-dots']}`,
    }
    return (
      <div styleName='slider_wraper'> 
        <Slider {...defaultSettings}>
          {
            imgs && imgs.map((item, index) => {
              return <img key={index}  alt='' src={item.pic} />
            })
          }
        </Slider>
      </div>
    )
  }

}

const Wrapper = CSSModules(Slick, styles, {allowMultiple: true})
export default Wrapper
