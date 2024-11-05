import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Projects from './Projects';

const Home = () => {
  return (
    <div className="bg-gray-100">
      <NavBar />
      <Hero />
      <Projects />
    </div>
  );
};

export default Home;
