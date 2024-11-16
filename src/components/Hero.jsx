import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="max-w-6xl font-urbanist mx-auto pb-24 pt-1 md:pt-8">
      <div className="px-6 md:px-12">
        <p className="text-xl">Hi, I'm Nurudeen</p>
        <h1 className="text-5xl lg:text-8xl font-medium leading-tight tracking-normal mt-8 mb-14">
          Creating impactful experiences on visual design
        </h1>
        <div className="flex justify-between flex-wrap md:flex-nowrap gap-6">
          <div className="w-full md:w-1/2 sm:order-2">
            <p className="text-left text-xl text-gray-700 leading-normal tracking-normal">
              I transform ideas into impactful digital experiences, delivering
              innovative solutions that elevate brands and captivate audiences
              around the world.
            </p>
          </div>
          <div className="w-full md:w-1/2 sm:order-1 text-left">
            <button className="bg-black text-white px-14 py-6 text-xl font-medium rounded-full flex justify-center items-center gap-2 hover:bg-white hover:border hover:border-black hover:text-black">
              Let's Talk <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
