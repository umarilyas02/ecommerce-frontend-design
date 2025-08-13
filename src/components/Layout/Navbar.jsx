import "./Navbar.css";
import logo from "../../assets/nav-logo.png";
import profile from "../../assets/Profile.png";
import message from "../../assets/Message.png";
import orders from "../../assets/Orders.png";
import cart from "../../assets/Cart.png";
import belgium from "../../assets/belgium.png";


import { useCart } from "../../CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { itemCount } = useCart();
  return (
    <nav>
      {/* 🔵 Upper Navbar */}
      <div className="upper-div-wrapper">
        <div className="Upper-Navbar">
          {/* Logo */}
          <div>
            <Link to="/" ><img src={logo} alt="Logo" className="nav-logo" /></Link>
          </div>

          {/* Search */}
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
            <select className="category-select">
              <option>All category</option>
            </select>
            <button className="search-btn">Search</button>
          </div>

          {/* Icons */}
          <div className="nav-icons">
            <div className="nav-icon-item"><img src={profile} alt="Profile" className="profile" /></div>
            <div className="nav-icon-item"><img src={message} alt="Message" className="message" /></div>
            <div className="nav-icon-item">
              <img src={orders} alt="Orders" className="orders" />
              {/* This part shows the item count for 'orders', not the cart */}
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </div>
            {/* ADD THE LINK HERE */}
            <Link to="/cart">
              <div className="nav-icon-item">
                <img src={cart} alt="Cart" className="cart" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 🟢 Lower Navbar */}
      <div className="lower-div-wrapper">
        <div className="Lower-Navbar">
          {/* Left Menu */}
          <ul className="menu-left">
            <li>
              <strong>☰ All category</strong>
            </li>
            <li>Hot offers</li>
            <li>Gift boxes</li>
            <li>Projects</li>
            <li>Menu item</li>
            <li>
              <select className="help">
                <option>Help</option>
              </select>
            </li>
          </ul>

          {/* Right Dropdowns */}
          <div className="menu-right">
            <select className="lower-select">
              <option>English, USD</option>
            </select>
            <div className="ship-to-select">
              {/* we cant add the img in option element which is ship to img src={belgium} */}
              <img
                src={belgium}
                alt="Belgium"
                className="country-flag"
                style={{
                  width: "20px",
                  marginRight: "6px",
                  verticalAlign: "middle",
                }}
              />
              <select
                className="lower-select"
                style={{ display: "inline-block", width: "auto" }}
              >
                <option>Ship to</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
