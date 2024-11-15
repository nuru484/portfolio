import NavBar from './components/NavBar';
import Text from './components/Text';

const App = () => {
  return (
    <div>
      <div className="bg-blue-700 text-blue-800transition-opacity duration-500 ease-in-out">
        <NavBar />
      </div>

      <Text />
    </div>
  );
};

export default App;
