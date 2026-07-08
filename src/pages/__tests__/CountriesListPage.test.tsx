import { server } from '@/mocks/node';
import { http, HttpResponse } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import userEvent from '@testing-library/user-event';
import Layout from '@/components/layout/Layout';
import CountriesListPage from '../CountriesListPage';

function renderListPage(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CountriesListPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('CountriesListPage', () => {
  describe('data states', () => {
    it('shows skeleton while loading, then renders country cards', async () => {
      const { container } = renderListPage();

      expect(
        container.querySelectorAll('[data-slot="skeleton"]').length,
      ).toBeGreaterThan(0);

      expect(await screen.findByText('Afghanistan')).toBeInTheDocument();
    });

    it('shows error message when API fails', async () => {
      server.use(
        http.get('/api/countries', () =>
          HttpResponse.json({ message: 'Server error' }, { status: 500 }),
        ),
      );

      renderListPage();

      expect(await screen.findByText(/Server error/i)).toBeInTheDocument();
    });

    it('shows empty state when API returns no countries', async () => {
      server.use(http.get('/api/countries', () => HttpResponse.json([])));

      renderListPage();

      expect(
        await screen.findByText('No countries found.'),
      ).toBeInTheDocument();
    });
  });

  describe('URL-driven filters', () => {
    it('filters countries with search URL query', async () => {
      renderListPage('/?search=af');

      await waitFor(() => {
        expect(screen.getByText('Afghanistan')).toBeInTheDocument();
        expect(screen.queryByText('Albania')).not.toBeInTheDocument();
      });
    });

    it('filters countries with region URL query', async () => {
      renderListPage('/?region=asia');

      await waitFor(() => {
        expect(screen.getByText('Afghanistan')).toBeInTheDocument();
        expect(screen.queryByText('Albania')).not.toBeInTheDocument();
      });
    });
  });

  describe('user-driven filters', () => {
    it('filters countries on user input in search', async () => {
      const user = userEvent.setup();
      renderListPage();

      await screen.findByText('Afghanistan');

      await user.type(
        screen.getByRole('textbox', { name: /search for a country/i }),
        'india',
      );

      await waitFor(
        () => {
          expect(screen.getByText('India')).toBeInTheDocument();
          expect(screen.queryByText('Afghanistan')).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it('filters countries on region selection', async () => {
      const user = userEvent.setup();
      renderListPage();

      await screen.findByText('Afghanistan');

      await user.click(
        screen.getByRole('combobox', { name: /filter by region/i }),
      );
      await user.click(screen.getByRole('option', { name: /asia/i }));

      await waitFor(() => {
        expect(screen.getByText('India')).toBeInTheDocument();
        expect(screen.queryByText('France')).not.toBeInTheDocument();
      });
    });
  });
});
