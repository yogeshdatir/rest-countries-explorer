import type { ReactNode } from 'react';

export function TypographyH1({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-extrabold text-3xl text-center text-balance tracking-tight scroll-m-20">
      {children}
    </h1>
  );
}
