import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Props = {
  value: string | undefined;
  onValueChange: (value: string) => void;
  selectItems: string[];
};

const SelectField = ({ value, onValueChange, selectItems }: Props) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="px-6 w-[200px] h-full!">
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
              <SelectItem key={region} value={region}>
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
