import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Projects from './Projects';
import Skills from '../components/Skills';
import About from '../components/About';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="bg-gray-200">
      <NavBar />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
