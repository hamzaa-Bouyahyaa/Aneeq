import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-navy">Beauty</span>
              <span className="text-2xl font-bold text-gold">Salon</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive("/") ? "text-gold" : "text-navy hover:text-gold"
              }`}
            >
              Home
            </Link>
            <Link
              to="/salons"
              className={`font-medium transition-colors ${
                isActive("/salons") ? "text-gold" : "text-navy hover:text-gold"
              }`}
            >
              Salons
            </Link>
            <Link
              to="/services"
              className={`font-medium transition-colors ${
                isActive("/services")
                  ? "text-gold"
                  : "text-navy hover:text-gold"
              }`}
            >
              Services
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive("/about") ? "text-gold" : "text-navy hover:text-gold"
              }`}
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="font-medium text-navy hover:text-gold transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-gold hover:bg-gold-dark text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-button"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-navy"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 bg-white rounded-lg p-4 shadow-elegant">
            <Link
              to="/"
              className={`block font-medium transition-colors ${
                isActive("/") ? "text-gold" : "text-navy hover:text-gold"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/salons"
              className={`block font-medium transition-colors ${
                isActive("/salons") ? "text-gold" : "text-navy hover:text-gold"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Salons
            </Link>
            <Link
              to="/services"
              className={`block font-medium transition-colors ${
                isActive("/services")
                  ? "text-gold"
                  : "text-navy hover:text-gold"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className={`block font-medium transition-colors ${
                isActive("/about") ? "text-gold" : "text-navy hover:text-gold"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 space-y-3">
              <Link
                to="/login"
                className="block font-medium text-navy hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block bg-gold hover:bg-gold-dark text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-button w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
