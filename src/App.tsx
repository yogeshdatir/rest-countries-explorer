import MainContent from './components/MainContent';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="flex flex-col items-center">
      <TopBar />
      <MainContent />
    </div>
  );
}

export default App;
