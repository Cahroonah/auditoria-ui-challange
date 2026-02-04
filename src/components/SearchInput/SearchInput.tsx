import { useEffect, useState } from "react";
import { SearchInputProps } from "./SearchInput.types";
import "./SearchInput.css"
import { useDebounce } from "../../hooks/useDebounce";
import SearchIcon from "../../assets/icons/search.svg"

export const SearchInput = ({ value, onChange, debounceTime = 500, placeholder = "Search..." }: SearchInputProps) => {
    const [input, setInput] = useState(value)
    const debouncedInput = useDebounce(input, debounceTime);

    useEffect(() => {
        onChange(debouncedInput)
    }, [debouncedInput, onChange])

    return (
        <div className="search-input-wrapper">
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <span className="search-icon">
                <img src={SearchIcon} alt="search" className="search-icon" />
            </span>
        </div>

    )
};