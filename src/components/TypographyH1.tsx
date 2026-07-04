import type { ReactNode } from 'react';

export function TypographyH1({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`font-extrabold text-3xl text-balance tracking-tight scroll-m-20 ${className}`}
    >
      {children}
    </h1>
  );
}
