import { SearchIcon } from 'lucide-react';

import { Field } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

interface Props {
  value: string | number;
  handleSearch: React.ChangeEventHandler;
}

export function SearchInput({ value, handleSearch }: Props) {
  return (
    <Field className="w-[480px]">
      <InputGroup className="flex gap-3 px-6 h-full">
        <InputGroupInput
          id="input-group-search"
          placeholder="Search for a country..."
          value={value}
          onChange={handleSearch}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
