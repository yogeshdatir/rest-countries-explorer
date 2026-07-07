import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';
import userEvent from '@testing-library/user-event';

function ThemeConsumerTestComponent() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(`${theme === 'dark' ? 'light' : 'dark'}`);
  };

  return (
    <>
      <button onClick={handleThemeToggle} aria-label="theme-toggle">
        Dark Mode
      </button>
      <div data-testid="theme">{theme}</div>
    </>
  );
}

describe('ThemeContext', () => {
  it('should default to dark theme', () => {
    render(
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ThemeConsumerTestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('should toggle theme', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ThemeConsumerTestComponent />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: /theme-toggle/i }));

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('should persist theme using localstorage', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ThemeConsumerTestComponent />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: /theme-toggle/i }));

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(localStorage.getItem('vite-ui-theme')).toBe('light');
  });
});
