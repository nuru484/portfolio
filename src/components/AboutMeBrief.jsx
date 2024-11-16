import { ArrowRight } from 'lucide-react';

const AboutMeBrief = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 font-urbanist flex flex-col gap-8">
      <p className="text-6xl font-medium leading-tight tracking-wide">
        Helping brands achieve digital mastery of creative innovation and
        strategic planning.
      </p>
      <p className="text-2xl w-3/4 text-gray-700 leading-normal tracking-wide">
        Transforming ideas into digital realities by blending strategic insights
        with innovative design, helping brands thrive in a rapidly evolving
        digital landscape.
      </p>

      <div>
        <button className="bg-white text-black px-8 py-4 text-xl font-medium rounded-full flex justify-center items-center gap-2 hover:bg-black border border-black hover:text-white transition-colors duration-500 ease-in-out">
          About Me
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AboutMeBrief;
