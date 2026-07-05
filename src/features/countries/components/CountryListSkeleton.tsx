import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';

const CountryListSkeleton = memo(() => {
  return new Array(12)
    .fill(null)
    .map((_, index) => (
      <Skeleton
        key={index}
        className="bg-gray-300 rounded-[5px] w-[264px] h-[336px]"
      />
    ));
});

export default CountryListSkeleton;
