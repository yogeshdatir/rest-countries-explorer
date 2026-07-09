# Patterns Reference — REST Countries Explorer

## useDeferredValue (search filtering)

| Field | Detail |
|---|---|
| What | Defers a derived value's update so the input itself stays instantly responsive while an expensive re-render (filtering + re-rendering cards) happens in the background |
| When to use | Filtering/rendering a large already-loaded dataset in response to fast-changing input (typing) |
| When NOT to use | Anything involving a network request — it only affects local render scheduling, not fetch timing |
| Used in | `useCountries.ts` — `deferredSearch = useDeferredValue(search)` |

```tsx
const [search, setSearch] = useState('');
const deferredSearch = useDeferredValue(search);

const countries = useMemo(
  () => allCountries?.filter(c => c.name.toLowerCase().includes(deferredSearch.toLowerCase())),
  [allCountries, deferredSearch]
);
```

**Tradeoff:** slightly more complex than a plain debounce, but no fixed artificial delay — React decides scheduling based on actual render cost.

---

## useTransition (region select)

| Field | Detail |
|---|---|
| What | Marks a state update as non-urgent, so React can keep showing old UI while the new render is prepared |
| When to use | Low-frequency, discrete interactions (dropdown/select) where there's no typing urgency to protect |
| When NOT to use | On the state driving an input field itself — that needs to stay urgent/instant |
| Used in | `useCountries.ts` — `handleRegionSelect` wraps `setSearchParams` in `startTransition` |

```tsx
const [isPending, startTransition] = useTransition();

const handleRegionSelect = (value: string) => {
  startTransition(() => {
    setSearchParams(prev => { /* ... */ });
  });
};
```

**Tradeoff:** adds an `isPending` flag to manage in the UI (faded/stale content indicator) — small added complexity for a smoother perceived transition.

---

## useDeferredValue vs useTransition vs debounce — when each fits

| Pattern | Fits when |
|---|---|
| `useDebounce` | Delaying work until input pauses — best when the triggered action is expensive/external (e.g. an API call per keystroke) |
| `useDeferredValue` | Reading side — deprioritizing a derived value's render, input itself stays urgent |
| `useTransition` | Writing side — deprioritizing the render caused by a specific state update you control directly |

---

## Client-side filtering via useMemo (not useEffect + state)

| Field | Detail |
|---|---|
| What | Compute the filtered/derived list synchronously during render using `useMemo`, instead of `useEffect` + a separate state variable |
| When to use | Any derived data depending only on existing state/props — no need for a second state variable and an effect to sync it |
| When NOT to use | When the derived value requires an async operation (network call) — that legitimately needs `useEffect` |
| Bug it fixes | Using `useEffect` to compute a derived value causes a one-render-late flash — the old/unfiltered value paints first, then the effect fires and re-renders with the correct value |
| Used in | `useCountries.ts` — `countries = useMemo(...)` |

---

## State lifted to Layout (shared via Outlet context)

| Field | Detail |
|---|---|
| What | Fetch/filter state lives in the route's parent (`Layout`), passed to child routes via React Router's `<Outlet context={...}>` |
| When to use | Data needs to persist across sibling routes (list ↔ detail) without refetching on every navigation |
| When NOT to use | If the app needs the same shared data pattern in many unrelated places — that's when a dedicated Context or a library like React Query starts paying off over ad-hoc Outlet context |
| Used in | `Layout.tsx` calls `useCountries()`, passes result via `<Outlet context={...}>`; pages consume via `useOutletContext<CountriesData>()` |

**Tradeoff:** avoided introducing a new Context or React Query dependency for a single shared dataset; would reconsider if more shared state needs the same treatment.
