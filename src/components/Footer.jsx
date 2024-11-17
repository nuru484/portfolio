import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-6xl mx-auto font-urbanist">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-medium mb-2">Let's Create</h2>
          <h2 className="text-5xl font-medium mb-4">Something</h2>
          <h2 className="text-5xl font-medium text-gray-300 mb-8">Together</h2>

          <button className="bg-black text-white px-8 py-4 rounded-full inline-flex items-center gap-2 border hover:bg-white hover:border hover:border-black hover:text-black transition-colors duration-500 ">
            Get In Touch! <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-5 px-6 mb-16">
          <a
            href="#"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            Facebook <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            Linkedin <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            Twitter
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 w-full h-20 py-5">
        <div className="max-w-6xl h-full font-urbanist flex justify-between items-center flex-wrap gap-4 text-center mx-auto px-6 md:px-12">
          <p className="text-gray-600">
            ©2024. All Rights Reserved By Nurudeen
          </p>
          <button
            className="flex items-center gap-2 mx-auto md:mx-0 hover:text-gray-600 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Scroll to Top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
