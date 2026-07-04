import { Outlet } from 'react-router';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="flex flex-col items-center">
      <TopBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
