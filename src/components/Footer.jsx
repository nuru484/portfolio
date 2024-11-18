import React from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BottomBar = () => {
  return (
    <>
      {/* {Bottom Bar} */}
      <div className=" w-full h-28">
        <div className="max-w-6xl md:h-full font-urbanist flex justify-around md:justify-between items-center flex-wrap gap-4 text-center mx-auto px-6 md:px-12 py-7">
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
    </>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-6xl mx-auto font-urbanist">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-medium mb-2">Let's Create</h2>
          <h2 className="text-5xl font-medium mb-4">Something</h2>
          <h2 className="text-5xl font-medium text-gray-300 mb-8">Together</h2>
          <Link to={'/contact'}>
            <button className="bg-black text-white px-8 py-4 rounded-full inline-flex items-center gap-2 border hover:bg-white hover:border hover:border-black hover:text-black transition-colors duration-500 ">
              Get In Touch! <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-5 px-6 mb-16">
          <a
            target="_blank"
            href="https://web.facebook.com/profile.php?id=100080955712476"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            Facebook <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/abdul-majeed-nurudeen-78266a182/"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            Linkedin <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            target="_blank"
            href="https://x.com/ABDULMAJEEDNUR3"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            Twitter
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="bg-gray-100">
        <BottomBar />
      </div>
    </footer>
  );
};

export default Footer;
