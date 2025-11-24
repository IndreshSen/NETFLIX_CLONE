import React from 'react'
import './Footer.css'
import yt_icon from '../../assets/youtube_icon.png'
import inst_icon from '../../assets/instagram_icon.png'
import x_icon from '../../assets/X_icon.png'
import fb_icon from '../../assets/facebook_icon.png'


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={yt_icon} alt="" />
        <img src={inst_icon} alt="" />
        <img src={x_icon} alt="" />
        <img src={fb_icon} alt="" />
      </div>
      <ul>
      <li>Audio Description</li>
      <li>Help Center</li>
      <li> Gift Cards</li>
      <li> Media center</li>
      <li>Investor Relations</li>
      <li> jobs</li>
      <li> Terms of Use</li>
      <li>Privacy</li>
      <li>Legal Notices</li>
      <li>Cookie Prefeences</li>
      <li>Contact Us</li>
      </ul>
      <p className="copyright-text">1990 to 2025</p>
    </div>
  )
}

export default Footer