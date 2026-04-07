import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

interface CustomSearchProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  delay?: number;
}

const CustomSearch = ({
  onSearch,
  placeholder = "Search...",
  delay = 500,
}: CustomSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Create a debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (onSearch) {
          onSearch(value);
        }
      }, delay),
    [onSearch, delay],
  );

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <InputGroup className="w-full max-w-sm ">
      <InputGroupInput
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="  "
      />

      <InputGroupText className="px-1">
        <Search className="h-4 w-4 text-muted-foreground" />
      </InputGroupText>
    </InputGroup>
  );
};

export default CustomSearch;
