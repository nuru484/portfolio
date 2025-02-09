import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isNavScrolledPast, setIsNavScrolledPast] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: 'projects', label: 'Projects' },
    { href: 'about', label: 'About' },
    {
      href: 'https://blog-api-frontend-blue.vercel.app/',
      label: 'Blog',
      external: true,
    },
    { href: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const currentPath =
      location.pathname === '/' ? 'Home' : location.pathname.slice(1);
    setActiveItem(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleActiveItem = (item) => {
    setActiveItem(item);
    item === 'Home' ? navigate(`/`) : navigate(`/${item}`);
  };

  const handleScroll = () => {
    if (navRef.current) {
      const { top } = navRef.current.getBoundingClientRect();
      setIsNavScrolledPast(top < -10);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="bg-white">
      <div className="max-w-6xl mx-auto px-8 md:px-10 pt-8 pb-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex justify-between w-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isNavScrolledPast ? 0 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            <h1 className="text-2xl font-urbanist font-semibold text-black">
              Portfolio
            </h1>

            <p
              onClick={toggleMenu}
              className={`md:hidden text-gray-800 text-xl font-urbanist font-semibold ${
                isMenuOpen && 'text-gray-400 z-50 mr-4'
              }`}
            >
              Menu
            </p>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isNavScrolledPast ? 0 : 1,
              scale: isNavScrolledPast ? 0.95 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            className={`hidden md:flex gap-6 font-urbanist ${
              isNavScrolledPast && 'pointer-events-none'
            }`}
          >
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors p-2 text-black text-lg font-semibold hover:text-gray-700 hover:cursor-pointer"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  key={item.href}
                  onClick={() => handleActiveItem(item.label)}
                  className={`transition-colors p-2 hover:cursor-pointer font-semibold text-lg ${
                    activeItem === item.label
                      ? 'text-gray-600'
                      : 'text-black hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </span>
              )
            )}
          </motion.div>
        </div>

        {isNavScrolledPast && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 0.3,
            }}
            onClick={toggleMenu}
            className={`fixed top-7 right-7 md:top-20 md:right-20 text-gray-600 p-6 md:p-9 rounded-full z-50 ${
              isMenuOpen ? 'bg-white' : 'bg-gray-950'
            } `}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        )}

        {/* Mobile Navigation */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isMenuOpen ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className="fixed top-0 right-0  w-full h-dvh md:w-2/3 lg:w-2/5 2xl:w-2/5 bg-gray-950 shadow-lg z-10"
        >
          <div className="h-full px-8 py-16 md:px-16 md:py-36 lg:px-24 flex flex-col justify-between">
            <div className="flex flex-col gap-4  font-urbanist">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    onClick={closeMenu}
                    rel="noopener noreferrer"
                    className="text-4xl text-white px-1.5 py-2.5 hover:text-gray-400 transition-colors flex items-center gap-3"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    key={item.href}
                    onClick={() => handleActiveItem(item.label)}
                    className="text-4xl text-white px-1.5 py-2.5 hover:text-gray-400 cursor-pointer transition-colors flex items-center gap-3"
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>

            <div className="flex flex-col gap-8">
              <h2 className="text-2xl py-4 text-gray-400 border-b border-gray-400">
                Socials
              </h2>
              <div className="flex flex-wrap gap-6 text-white">
                <div>
                  <a
                    target="_blank"
                    href="https://web.facebook.com/profile.php?id=100080955712476"
                  >
                    Facebook
                  </a>
                </div>

                <div>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/abdul-majeed-nurudeen-78266a182/"
                  >
                    LinkedIn
                  </a>
                </div>

                <div>
                  <a target="_blank" href="https://x.com/ABDULMAJEEDNUR3">
                    Twitter ( X )
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default NavBar;
