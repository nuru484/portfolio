import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="max-w-6xl font-urbanist mx-auto pb-24">
      <div className="px-10">
        <p className="text-xl">Hi, I'm Nurudeen</p>
        <h1 className="text-5xl lg:text-8xl font-medium leading-tight tracking-normal mt-8 mb-14">
          Creating impactful experiences on visual design
        </h1>
        <div className="w-full flex justify-between">
          <div className="w-1/2 text-left">
            <button className=" bg-black text-white px-14 py-6 text-xl font-medium rounded-full flex justify-center items-center gap-2">
              Let's Talk <ArrowRight />
            </button>
          </div>

          <p className="w-1/2 text-left text-2xl text-gray-700 leading-snug tracking-normal">
            I transform ideas into impactful digital experiences, delivering
            innovative solutions that elevate brands and captivate audiences
            around the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
