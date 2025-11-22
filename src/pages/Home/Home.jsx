import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'




const Home = () => {
  return (
    <div className='Home'>
        <Navbar/>
        <div className="hero">
          <img className ="banner-img" src={hero_banner} alt="" />
          <div className="hero-caption">

            <img className='caption-img' src={hero_title} alt="" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde iste eius, exercitationem cum voluptatem, nam quae ex saepe reiciendis doloremque consectetur soluta?</p>
            <div className="hero-btns">
              <button className='btn'><img src={play_icon} alt="" />Play</button>
              <button className='btn dark-btn'><img src={info_icon} alt="" />More</button>
            
            </div>
              <TitleCards/>
          </div>
        </div>
    </div>
  )
}

export default Home
