import React, { useEffect, useState } from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav_sub">
        <Link to="/" onClick={closeMenu}>
          <img
            src="https://i.imgur.com/5Svx08R.png"
            alt="Logo"
            className="nav_img"
          />
        </Link>
      </div>
      <div className="nav_sub">
        {/* Desktop nav */}
        <ul className="nav_ul">
          <li className="nav_li">
            <Link to="/Wedding-details" className="auu" onClick={closeMenu}>
              Wedding Details
            </Link>
          </li>
          <li className="nav_li">
            <Link className="auu" to="/travel-stay" onClick={closeMenu}>
              Travel &amp; Stay
            </Link>
          </li>

          <li className="nav_li">
            <Link to="/rsvp" className="auu" onClick={closeMenu}>
              RSVP
            </Link>
          </li>
        </ul>

        {/* Mobile menu icon button */}
        <button
          className="mobile_menu_button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile_menu_overlay">
          <ul className="mobile_nav_ul">
           
            <li className="mobile_nav_li">
              <Link className="auu" to="/Wedding-details" onClick={closeMenu}>
                Wedding Details
              </Link>
            </li>
            <li className="mobile_nav_li">
              <Link className="auu" to="/travel-stay" onClick={closeMenu}>
                Travel &amp; Stay
              </Link>
            </li>

           
            <li className="mobile_nav_li">
              <Link className="auu" to="/rsvp" onClick={closeMenu}>
                Rsvp
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
