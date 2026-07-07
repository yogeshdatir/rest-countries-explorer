import { SearchIcon, X } from 'lucide-react';

import { Field } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Button } from '../ui/button';

interface Props {
  value: string | number;
  handleSearch: (value: string) => void;
  disabled?: boolean;
}

export function SearchInput({ value, handleSearch, disabled = false }: Props) {
  return (
    <Field className="w-full lg:w-[480px] h-[56px]">
      <InputGroup className="flex gap-3 px-6 h-full">
        <InputGroupInput
          id="input-group-search"
          placeholder="Search for a country..."
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          disabled={disabled}
          aria-label="Search for a country"
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        {value && (
          <InputGroupAddon align="inline-end">
            <Button
              variant="ghost"
              size="xs"
              className="rounded-full w-4 h-4"
              onClick={() => handleSearch('')}
            >
              <X />
            </Button>
          </InputGroupAddon>
        )}
      </InputGroup>
    </Field>
  );
}
