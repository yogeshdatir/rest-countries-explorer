import { act, renderHook } from '@testing-library/react';
import useDebounce from '../useDebounce';

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should delay updating value until delay', async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: {
          value: 'a',
        },
      },
    );

    rerender({ value: 'ab' });
    expect(result.current).toBe('a');

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe('ab');

    vi.useRealTimers();
  });
});
