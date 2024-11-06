import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Projects from './Projects';
import Skills from '../components/Skills';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-gray-200">
      <NavBar />
      <Hero />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
};

export default Home;
