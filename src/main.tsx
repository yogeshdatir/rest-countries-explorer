import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import CountryDetailsLayout from './components/CountryDetailsLayout.tsx';
import MainContent from './components/MainContent.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

async function enableMocking() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return
  // }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<MainContent />} />
              <Route path=":alpha3Code" element={<CountryDetailsLayout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>,
  );
});
