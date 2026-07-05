import { Outlet } from 'react-router';
import TopBar from './TopBar';

export const containerClasses = 'max-sm:w-xs sm:w-2xl lg:w-4xl xl:w-7xl';

const Layout = () => {
  return (
    <div className="flex flex-col items-center">
      <TopBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
