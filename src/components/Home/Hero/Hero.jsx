import './Hero.css'

import banner from '../../../assets/Hero-image.png'
import avatar from '../../../assets/avatar.png'

import {Link} from 'react-router-dom';

const Hero = () => {
  return (
    <>
    <div className="hero">
        <div className="category-sidebar">
                <div className="category-item active">Automobiles</div>
                <div className="category-item">Clothes and wear</div>
                <div className="category-item">Home interiors</div>
                <div className="category-item">Computer and tech</div>
                <div className="category-item">Tools, equipments</div>
                <div className="category-item">Sports and outdoor</div>
                <div className="category-item">Animal and pets</div>
                <div className="category-item">Machinery tools</div>
                <div className="category-item">More category</div>
            </div>

            <div className="main-banner">

              <img src={banner} alt="banner-image" className='banner-image' />
                <div className="banner-content">
                    <h1>Latest trending<br/><span>Electronic items</span></h1>
                    <button className="learn-more-btn">Learn more</button>
                </div>
            </div>

            <div className="right-panel">
                <div className="user-panel">
                    <div className="user-info">
                        <div className="user-avatar">
                            <img src={avatar} alt="user-avatar" className='avatar'/>
                        </div>
                        <div>
                            <p>Hi, user</p>
                            <p>let's get started</p>
                        </div>
                    </div>
                    <button className="join-now-btn">Join now</button>
                    <button className="log-in-btn">Log in</button>
                </div>
                <div className="promo-panel promo-1">
                    Get US $10 off with a new supplier
                </div>
                <div className="promo-panel promo-2">
                    Send quotes with supplier preferences
                </div>
            </div>

    </div>


    </>
  )
}

export default Hero