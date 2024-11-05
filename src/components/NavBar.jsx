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
    { href: 'skills', label: 'Skills', icon: <Code2 size={20} /> },
    { href: 'about', label: 'About', icon: <User size={20} /> },
    {
      href: 'https://blog-api-frontend-blue.vercel.app/',
      label: 'Blog',
      icon: <BookOpen size={20} />,
      external: true, // Mark this as an external link
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
    <nav className="sticky top-0 bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600">Portfolio</h1>

          {/* Desktop Navigation - No Icons */}
          <div className="hidden lg:flex gap-6">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors p-2 text-gray-600 hover:text-blue-600 hover:cursor-pointer"
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
                  className={`transition-colors p-2 hover:cursor-pointer ${
                    activeItem === item.label
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600'
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
            className="lg:hidden text-gray-600 hover:text-blue-600 focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={closeMenu}
          />
        )}

        {/* Mobile Navigation - Right Side Drawer with Icons */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden z-40`}
        >
          <div className="flex flex-col pt-20 px-4">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="p-2 text-gray-600 hover:bg-gray-200 transition-colors border-b border-gray-100 flex items-center gap-3"
                >
                  <span className="text-gray-400">{item.icon}</span>
                  {item.label}
                </a>
              ) : (
                <ScrollLink
                  key={item.href}
                  to={item.href}
                  smooth={true}
                  duration={500}
                  offset={-70} // Adjust if needed
                  onClick={closeMenu}
                  className="p-2 text-gray-600 hover:bg-gray-200 hover:cursor-pointer transition-colors border-b border-gray-100 flex items-center gap-3"
                >
                  <span className="text-gray-400">{item.icon}</span>
                  {item.label}
                </ScrollLink>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
