import { Skeleton } from '@/components/ui/skeleton';
import { memo, useEffect, useState } from 'react';

const CountryListSkeleton = memo(() => {
  const [showColdStartMessage, setShowColdStartMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowColdStartMessage(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showColdStartMessage && (
        <div className="space-y-1 col-span-full text-muted-foreground text-sm text-center">
          <p>
            Still loading — the backend is hosted on a free tier that spins down
            after inactivity.
          </p>
          <p>
            First request after idle can take up to 30 seconds while the server
            wakes up. Thanks for your patience!
          </p>
        </div>
      )}
      {new Array(12).fill(null).map((_, index) => (
        <Skeleton
          key={index}
          className="bg-gray-300 rounded-[5px] w-[264px] h-[336px]"
        />
      ))}
    </>
  );
});

export default CountryListSkeleton;
