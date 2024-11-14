import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import {
  Menu,
  X,
  Home,
  FolderKanban,
  Code2,
  User,
  BookOpen,
  Contact,
} from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const navItems = [
    { href: 'home', label: 'Home', icon: <Home size={20} /> },
    { href: 'projects', label: 'Projects', icon: <FolderKanban size={20} /> },
    { href: 'about', label: 'About', icon: <User size={20} /> },
    {
      href: 'https://blog-api-frontend-blue.vercel.app/',
      label: 'Blog',
      icon: <BookOpen size={20} />,
      external: true,
    },
    { href: 'contact', label: 'Contact', icon: <Contact size={20} /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleActiveItem = (item) => {
    setActiveItem(item);
  };

  return (
    <nav className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-semibold text-black">Portfolio</h1>

          {/* Desktop Navigation - No Icons */}
          <div className="hidden lg:flex gap-6">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors p-2 text-gray-700 font-semibold hover:text-gray-700 hover:cursor-pointer"
                >
                  {item.label}
                </a>
              ) : (
                <ScrollLink
                  key={item.href}
                  to={item.href}
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onClick={() => handleActiveItem(item.label)}
                  className={`transition-colors p-2 hover:cursor-pointer font-semibold text-lg ${
                    activeItem === item.label
                      ? 'text-gray-700'
                      : 'text-black hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </ScrollLink>
              )
            )}
          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={toggleMenu}
            className={`lg:hidden text-gray-600  p-6 mr-7 rounded-full focus:outline-none z-50 ${
              isMenuOpen ? 'bg-white' : 'bg-black'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Right Side Drawer with Icons */}
        <div
          className={`fixed top-0 right-0 flex flex-col justify-center px-12 py-24 h-full w-full md:w-3/4 bg-gray-950 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden z-40`}
        >
          <div className="flex flex-col gap-10">
            <p className="text-gray-400 text-2xl px-1.5 py-2.5 border-b border-gray-400">
              Navigation
            </p>

            <div className="flex flex-col gap-5">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="text-4xl text-white px-1.5 py-2.5 hover:text-gray-400 transition-colors flex items-center gap-3"
                  >
                    {item.label}
                  </a>
                ) : (
                  <ScrollLink
                    key={item.href}
                    to={item.href}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    onClick={closeMenu}
                    className="text-4xl text-white px-1.5 py-2.5  hover:text-gray-400 hover:cursor-pointer transition-colors  flex items-center gap-3"
                  >
                    {item.label}
                  </ScrollLink>
                )
              )}
            </div>

            <div className="flex flex-col gap-10">
              <h2 className="text-2xl px-1.5 py-4 text-gray-400 border-b border-gray-400">
                Socials
              </h2>
              <div className="flex flex-wrap gap-6 text-white">
                <div>
                  <a href="https://web.facebook.com/profile.php?id=100080955712476">
                    Facebook
                  </a>
                </div>

                <div>
                  <a href="https://www.linkedin.com/in/abdul-majeed-nurudeen-78266a182/">
                    LinkedIn
                  </a>
                </div>

                <div>
                  <a href="https://web.facebook.com/profile.php?id=100080955712476">
                    Twitter ( X )
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
