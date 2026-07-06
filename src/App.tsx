import Layout from '@/components/layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import CountriesListPage from './pages/CountriesListPage';
import { lazy, Suspense } from 'react';
import { Spinner } from './components/ui/spinner';

const CountryDetailsPage = lazy(() => import('@/pages/CountryDetailsPage'));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CountriesListPage />} />
            <Route
              path=":alpha3Code"
              element={
                <Suspense
                  fallback={
                    <div className="flex flex-1 justify-center items-center gap-6 w-full">
                      <Spinner className="size-20" />
                    </div>
                  }
                >
                  <CountryDetailsPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
