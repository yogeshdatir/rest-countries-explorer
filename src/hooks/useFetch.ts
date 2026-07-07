import { useEffect, useState } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, {
      signal: controller.signal,
    })
      .then(async (res) => {
        console.log(res);
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(
            body?.message ?? `Request failed with status ${res.status}`,
          );
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setData(data);
        setError(null);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;

        console.error('Fetch failed:', error);
        setLoading(false);
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred',
        );
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
