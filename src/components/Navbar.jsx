import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import "./navbar.css";
import { supabase } from "../supabaseClient";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
      return;
    }
    setMenuOpen(false);
    setMobileMenuOpen(false);
    setSession(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const goToProfile = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
    navigate("/profile");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }

      if (!mobileMenuRef.current) return;
      if (!mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Left side: logo and name */}
      <Link to="/" className="nav-left">
        <img src={logo} alt="logo" className="logo" />
        <span className="brand-name">Srinivasa Interior Designers</span>
      </Link>

      {/* Right side: menu */}
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/services">Services</Link>

        {session ? (
          <div className="profile-menu" ref={menuRef}>
            <button
              type="button"
              className="profile-trigger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              Profile <span className="caret">▾</span>
            </button>

            {menuOpen ? (
              <div className="profile-dropdown" role="menu">
                <button
                  type="button"
                  className="profile-item"
                  onClick={goToProfile}
                  role="menuitem"
                >
                  My Profile
                </button>
                <button
                  type="button"
                  className="profile-item danger"
                  onClick={handleLogout}
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Mobile hamburger menu */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Mobile side menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" ref={mobileMenuRef}>
          <div className="mobile-menu">
            <button
              className="mobile-menu-close"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              ×
            </button>

            <div className="mobile-menu-content">
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
              <Link to="/about" onClick={closeMobileMenu}>
                About Us
              </Link>
              <Link to="/services" onClick={closeMobileMenu}>
                Services
              </Link>

              {session ? (
                <>
                  <Link to="/profile" onClick={closeMobileMenu}>
                    My Profile
                  </Link>
                  <button
                    type="button"
                    className="mobile-logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
