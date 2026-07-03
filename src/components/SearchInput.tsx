import { SearchIcon } from 'lucide-react';

import { Field } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

export function SearchInput() {
  return (
    <Field className="w-[480px]">
      <InputGroup className="flex gap-3 px-6 h-full">
        <InputGroupInput
          id="input-group-search"
          placeholder="Search for a country..."
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
