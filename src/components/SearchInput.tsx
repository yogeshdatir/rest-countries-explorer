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
  disabled?: boolean;
}

export function SearchInput({ value, handleSearch, disabled = false }: Props) {
  return (
    <Field className="w-[480px]">
      <InputGroup className="flex gap-3 px-6 h-full">
        <InputGroupInput
          id="input-group-search"
          placeholder="Search for a country..."
          value={value}
          onChange={handleSearch}
          disabled={disabled}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
