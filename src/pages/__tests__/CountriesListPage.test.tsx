import { server } from '@/mocks/node';
import { http, HttpResponse } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import CountriesListPage from '../CountriesListPage';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

describe('CountriesListPage', () => {
  it('shows skeleton while loading, then renders country cards', async () => {
    // Arrange — MSW's default handler serves real mock data
    const { container } = render(
      <MemoryRouter>
        <CountriesListPage />
      </MemoryRouter>,
    );

    // Act — nothing to trigger, fetch happens on mount

    // Assert — loading state first

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelectorAll('[data-slot="skeleton"]').length,
    ).toBeGreaterThan(0);

    // Assert — data renders after fetch resolves
    await waitFor(() => {
      expect(screen.getByText('Afghanistan')).toBeInTheDocument();
    });
  });

  it('shows error message when API fails', async () => {
    // Arrange — override default handler for this test only
    server.use(
      http.get('/api/countries', () => {
        return HttpResponse.json({ message: 'Server error' }, { status: 500 });
      }),
    );

    render(
      <MemoryRouter>
        <CountriesListPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Server error/i)).toBeInTheDocument();
    });
  });

  it('shows empty state when no countries match search', async () => {
    server.use(http.get('/api/countries', () => HttpResponse.json([])));

    render(
      <MemoryRouter>
        <CountriesListPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('No countries found.')).toBeInTheDocument();
    });
  });

  it('should filter countries with search URL query', async () => {
    render(
      <MemoryRouter initialEntries={['/?search=af']}>
        <CountriesListPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Afghanistan')).toBeInTheDocument();
      expect(screen.queryByText('Albania')).not.toBeInTheDocument();
    });
  });

  it('should filter countries with region URL query', async () => {
    render(
      <MemoryRouter initialEntries={['/?region=asia']}>
        <CountriesListPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Afghanistan')).toBeInTheDocument();
      expect(screen.queryByText('Albania')).not.toBeInTheDocument();
    });
  });

  it('should filter countries on user input in search', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CountriesListPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Afghanistan')).toBeInTheDocument();
    });

    await user.type(
      screen.getByRole('textbox', { name: /search for a country/i }),
      'india',
    );

    await waitFor(() => {
      expect(screen.getByText('India')).toBeInTheDocument();
    });
  });

  it('should filter countries on region selection', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CountriesListPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Afghanistan')).toBeInTheDocument();
    });

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
