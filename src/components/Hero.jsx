import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="max-w-6xl font-urbanist mx-auto mb-16  md:pt-8 pt-1">
      <div className="px-6 md:px-12">
        <p className="text-xl">Hi, I&apos;m Nurudeen</p>
        <h1 className="text-5xl lg:text-8xl font-medium leading-tight tracking-normal mt-8 mb-5 md:mb-8">
          Building Innovative Software Solutions for Real-World Impact
        </h1>
        <div className="flex justify-between flex-wrap md:flex-nowrap gap-6">
          <div className="w-full md:w-1/2 sm:order-2">
            <p className="text-left text-xl text-gray-700 leading-normal tracking-normal">
              I specialize in designing and developing efficient software
              solutions that streamline workflows and empower businesses to
              achieve their goals.
            </p>
          </div>
          <div className="w-full md:w-1/2 sm:order-1 text-left">
            <Link to="/contact">
              <button className="bg-black text-white px-14 py-6 text-xl font-medium rounded-full flex justify-center items-center gap-2 hover:bg-white hover:border hover:border-black hover:text-black transition-colors duration-500 ease-in-out">
                Contact Me <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
