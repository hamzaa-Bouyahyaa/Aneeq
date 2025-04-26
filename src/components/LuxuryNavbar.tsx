import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const LuxuryNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuAnimationComplete, setMenuAnimationComplete] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Check initial scroll position
  useEffect(() => {
    if (window.scrollY > 20) {
      setScrolled(true);
    }

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

  // Handle menu state changes
  useEffect(() => {
    // Close menu when route changes
    if (location.pathname) {
      setIsMenuOpen(false);
    }
  }, [location]);

  // Handle body scroll lock and animations
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";

      // Set animation complete after a delay to trigger item animations
      const timer = setTimeout(() => {
        setMenuAnimationComplete(true);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = "auto";
      setMenuAnimationComplete(false);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // We'll use this directly in the onClick handler

  // Animation classes for menu items
  const getMenuItemClass = (index: number) => {
    return `transform transition-all duration-700 ease-in-out ${
      menuAnimationComplete
        ? "translate-y-0 opacity-100"
        : "translate-y-8 opacity-0"
    } transition-delay-${index * 100}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ${
          scrolled
            ? isMenuOpen
              ? "bg-transparent py-5"
              : "bg-white py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="px-[56px] py-0 max-w-[none]">
          <div className="flex items-center justify-between relative">
            {/* Menu Button - positioned at the left edge with higher z-index */}
            <div className="flex-1">
              <button
                className={`flex items-center justify-center focus:outline-none z-[100] relative group ${
                  isMenuOpen
                    ? "text-white"
                    : scrolled
                    ? "text-black"
                    : "text-white"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <span
                      className={`absolute block w-5 h-0.5 transition-all duration-300 ease-out ${
                        isMenuOpen
                          ? "bg-white rotate-45"
                          : `bg-current rotate-0 ${
                              scrolled ? "bg-black" : "bg-white"
                            }`
                      }`}
                    ></span>
                    <span
                      className={`absolute block w-5 h-0.5 transition-all duration-300 ease-out ${
                        isMenuOpen
                          ? "bg-white -rotate-45"
                          : `bg-current rotate-0 translate-y-1.5 ${
                              scrolled ? "bg-black" : "bg-white"
                            }`
                      }`}
                    ></span>
                  </div>
                  <span className="uppercase text-xs tracking-widest font-medium mt-1">
                    {isMenuOpen ? "" : "Menu"}
                  </span>
                </div>
              </button>
            </div>

            {/* Logo - Centered */}
            <div className="flex-1 flex justify-center">
              <Link to="/" className="flex items-center z-50 relative">
                <span
                  className={`text-2xl font-display tracking-luxury uppercase ${
                    isMenuOpen
                      ? "text-white"
                      : scrolled
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  Aneeq
                </span>
              </Link>
            </div>

            {/* Login/Signup Buttons - Right Side */}
            <div className="flex-1 flex items-center justify-end space-x-2 md:space-x-4 z-50">
              {/* Login Button */}
              <Link
                to="/login"
                className={`relative overflow-hidden group px-3 md:px-5 py-2 text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                  isMenuOpen
                    ? "text-white hover:text-gold"
                    : scrolled
                    ? "text-black hover:text-gold"
                    : "text-white hover:text-gold"
                }`}
              >
                <span className="relative z-10 flex items-center">
                  <span className="hidden sm:inline">Login</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 sm:ml-1.5 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Sign Up Button */}
              <Link
                to="/signup"
                className={`relative overflow-hidden group px-3 md:px-5 py-2 text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                  isMenuOpen || !scrolled
                    ? "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                    : "bg-gold text-white hover:bg-black"
                }`}
              >
                <span className="relative z-10 flex items-center">
                  <span className="hidden sm:inline">Sign Up</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 sm:hidden"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 bg-black/10"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Left-side Drawer Menu Overlay */}
      <div
        className={`fixed inset-0 z-[80] transition-all duration-700 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Empty div that covers the right side of the screen - clicking here closes the menu */}
      </div>
      <div
        ref={menuRef}
        className={`fixed top-0 bottom-0 left-0 w-full md:w-1/3 bg-black bg-opacity-50 z-[90] transition-all duration-500 ease-in-out transform ${
          isMenuOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col justify-between py-20 px-8 md:px-12 overflow-y-auto">
          <div className="space-y-12">
            <div className="space-y-8">
              <h3
                className={`text-gold font-display uppercase tracking-luxury text-xl transition-all duration-700 ease-in-out ${
                  menuAnimationComplete
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                Navigation
              </h3>
              <ul className="space-y-6">
                <li className={getMenuItemClass(1)}>
                  <Link
                    to="/"
                    className="text-white hover:text-gold text-2xl md:text-3xl font-display uppercase tracking-luxury transition-colors relative group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li className={getMenuItemClass(2)}>
                  <Link
                    to="/salons"
                    className="text-white hover:text-gold text-2xl md:text-3xl font-display uppercase tracking-luxury transition-colors relative group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Salons
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li className={getMenuItemClass(3)}>
                  <Link
                    to="/services"
                    className="text-white hover:text-gold text-2xl md:text-3xl font-display uppercase tracking-luxury transition-colors relative group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li className={getMenuItemClass(4)}>
                  <Link
                    to="/about"
                    className="text-white hover:text-gold text-2xl md:text-3xl font-display uppercase tracking-luxury transition-colors relative group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h3
                className={`text-gold font-display uppercase tracking-luxury text-xl transition-all duration-700 ease-in-out ${
                  menuAnimationComplete
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                Account
              </h3>
              <ul className="space-y-6">
                <li className={getMenuItemClass(5)}>
                  <Link
                    to="/book-appointment"
                    className="text-white hover:text-gold text-2xl md:text-3xl font-display uppercase tracking-luxury transition-colors relative group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Appointment
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              </ul>
            </div>

            <div
              className={`transition-all duration-700 ease-in-out ${
                menuAnimationComplete
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <h3 className="text-gold font-display uppercase tracking-luxury text-xl mb-4">
                Contact
              </h3>
              <p className="text-white/80 mb-2">support@aneeq.com</p>
              <p className="text-white/80">+216 123 456 789</p>
            </div>
          </div>

          <div
            className={`mt-8 pt-8 border-t border-white/10 transition-all duration-700 ease-in-out ${
              menuAnimationComplete ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-white/60 hover:text-gold transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-gold transition-colors duration-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-gold transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LuxuryNavbar;
