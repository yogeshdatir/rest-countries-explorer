import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { act } from 'react';
import CountryListSkeleton from '../CountryListSkeleton';

describe('CountryListSkeleton', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not show cold-start message immediately', () => {
    render(<CountryListSkeleton />);
    expect(
      screen.queryByText(/spins down after inactivity/i),
    ).not.toBeInTheDocument();
  });

  it('shows cold-start message after 3 seconds', () => {
    render(<CountryListSkeleton />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(
      screen.getByText(/spins down after inactivity/i),
    ).toBeInTheDocument();
  });

  it('clears the timer on unmount (no state update after unmount)', () => {
    const { unmount } = render(<CountryListSkeleton />);
    unmount();

    // advancing timers after unmount should not throw or warn
    expect(() => {
      act(() => {
        vi.advanceTimersByTime(3000);
      });
    }).not.toThrow();
  });
});
