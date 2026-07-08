import { Outlet } from 'react-router';
import TopBar from './TopBar';
import useCountries from '@/features/countries/components/hooks/useCountries';

export const containerClasses = 'max-sm:w-xs sm:w-2xl lg:w-4xl xl:w-7xl';

const Layout = () => {
  const countriesData = useCountries();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <TopBar />
      <main className="flex flex-1 justify-center w-full">
        <Outlet context={countriesData} />
      </main>
    </div>
  );
};

export default Layout;
