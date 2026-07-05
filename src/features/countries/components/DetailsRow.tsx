import { Skeleton } from '@/components/ui/skeleton';
import type { DetailsRowData } from './CountryDetails';

type Props = DetailsRowData & {
  loading: boolean;
};

const DetailsRow = ({ label, value, loading }: Props) => {
  return (
    <span className="flex gap-2">
      <span className="font-semibold text-nowrap">{label}:</span>
      {loading ? <Skeleton className="bg-gray-300 w-20 h-4" /> : value}
    </span>
  );
};

export default DetailsRow;
