import NavBar from './components/NavBar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Text from './components/Text';

const App = () => {
  const projects = [1, 2, 3, 4, 5];
  return (
    <div>
      <NavBar />
      <Hero />
      <div>
        {projects.map((project) => (
          <ProjectCard />
        ))}
      </div>

      <Text />
    </div>
  );
};

export default App;
