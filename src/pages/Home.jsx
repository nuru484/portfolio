import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Projects from './Projects';
import Skills from '../components/Skills';

const Home = () => {
  return (
    <div className="bg-blue-100">
      <NavBar />
      <Hero />
      <Projects />
      <Skills />
    </div>
  );
};

export default Home;
