import { Outlet } from 'react-router';
import TopBar from './TopBar';

export const containerClasses = 'max-sm:w-xs sm:w-2xl lg:w-4xl xl:w-7xl';

const Layout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <TopBar />
      <main className="flex flex-1 justify-center w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
