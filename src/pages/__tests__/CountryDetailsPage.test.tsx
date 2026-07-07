import { MemoryRouter, Route, Routes } from 'react-router';
import CountryDetailsPage from '../CountryDetailsPage';
import { render, screen, waitFor } from '@testing-library/react';
import { server } from '@/mocks/node';
import { http, HttpResponse } from 'msw';

describe('CountryDetailsPage', () => {
  it('should render loading state', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/AFG']}>
        <Routes>
          <Route path="/:alpha3Code" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelectorAll('[data-slot="skeleton"]').length,
    ).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText('Afghanistan')).toBeInTheDocument();
    });
  });

  it('shows error if API fails', async () => {
    server.use(
      http.get('/api/country', () => {
        return HttpResponse.json({ message: 'Server error' }, { status: 500 });
      }),
    );

    render(
      <MemoryRouter initialEntries={['/AFG']}>
        <Routes>
          <Route path="/:alpha3Code" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('shows empty states when there is no data matching the alpha3Code', async () => {
    server.use(http.get('/api/country', () => HttpResponse.json(null)));

    render(
      <MemoryRouter initialEntries={['/AFG']}>
        <Routes>
          <Route path="/:alpha3Code" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('No country found')).toBeInTheDocument();
    });
  });
});
