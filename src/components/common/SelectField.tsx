import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Skeleton } from '../ui/skeleton';

type Props = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  selectItems: string[];
  loading: boolean;
  error: string | null;
  disabled?: boolean;
};

const SelectField = ({
  value,
  onValueChange,
  selectItems,
  loading,
  error,
  disabled = false,
}: Props) => {
  if (loading) return <Skeleton className="bg-gray-300 w-[200px] h-[56px]" />;

  if (error) return <div>{error}</div>;

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className="px-6 w-[200px] h-[56px]!"
        aria-label="Filter By Region"
      >
        <SelectValue placeholder="Filter by Region" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectItem key={'none'} value="">
            None
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          {selectItems.map((region: string) => {
            return (
              <SelectItem
                key={region}
                value={region}
                className="cursor-pointer"
              >
                {region}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectField;
