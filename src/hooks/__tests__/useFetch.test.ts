import { renderHook, waitFor } from '@testing-library/react';
import useFetch from '../useFetch';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/node';

import { getApiUrl, API_ENDPOINTS } from '@/config/api';

describe('useFetch', () => {
  it('should start in loading state', () => {
    const { result } = renderHook(() =>
      useFetch(getApiUrl(API_ENDPOINTS.COUNTRIES)),
    );
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('should fetch data successfully', async () => {
    const { result } = renderHook(() =>
      useFetch(getApiUrl(API_ENDPOINTS.COUNTRIES)),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).not.toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should return error message on failed fetch', async () => {
    server.use(
      http.get(getApiUrl(API_ENDPOINTS.COUNTRIES), () => {
        return HttpResponse.json({ message: 'Server error' }, { status: 500 });
      }),
    );

    const { result } = renderHook(() =>
      useFetch(getApiUrl(API_ENDPOINTS.COUNTRIES)),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Server error');
  });
});
