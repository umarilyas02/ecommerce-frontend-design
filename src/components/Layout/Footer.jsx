import './Footer.css'; 
import logo from '../../assets/nav-logo.png'; 
import appstore from '../../assets/app-store.png'; 
import googleplay from '../../assets/play-store.png';
import expand from '../../assets/expand_more-icon.png'
import fb from './facebook3.png'
import insta from './instagram3.png'
import linkedin from './linkedin3.png'
import twitter from './twitter3.png'
import yt from './youtube3.png'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="upper-footer">
        <div className="footer-column brand-column">
          <div className="brand-logo">
            <div className="logo-icon">
                <img src={logo} alt="Brand Logo" />
            </div>
            
          </div>
          <p className="brand-description">Best information about the company goes here but now dummy text is</p>
          <div className="social-links">
            <a href="#" className="social-icon"><img src={fb} alt="facebook"/></a>
            <a href="#" className="social-icon"><img src={twitter} alt="twitter"/></a>
            <a href="#" className="social-icon"><img src={linkedin} alt="linkedin" /></a>
            <a href="#" className="social-icon"><img src={insta} alt="instagram" /></a>
            <a href="#" className="social-icon"><img src={yt} alt="youtube" /></a>
            
          </div>
        </div>

        <div className="footer-column">
          <h3>About</h3>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Find store</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Blogs</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Partnership</h3>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Find store</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Blogs</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Information</h3>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Money Refund</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>For users</h3>
          <ul className="footer-links">
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">My Orders</a></li>
          </ul>
        </div>

        <div className="footer-column app-column">
          <h3>Get app</h3>
          <div className="app-links">
            <a href="#"><img src={appstore} alt="Download on the App Store" /></a>
            <a href="#"><img src={googleplay}alt="Get it on Google Play" /></a>
          </div>
        </div>
      </div>

      
        <div className="lower-footer">
                <div className="copyright">
                    © 2023 Ecommerce.
                </div>
                <div className="language-selector">
                    <span>English</span>
                    <span className="arrow-icon">
                        <img src={expand} alt="Expand Icon" />
                    </span>
                </div>
            </div>
      
    </footer>
  );
};

export default Footer;