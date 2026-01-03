
import { useState, useEffect, type ChangeEvent, type CSSProperties, type InputEvent, type JSX } from "react";
import SuggestionList from "./Suggesations-list";
import useDebounce from "../hooks/use-debounce";

interface AutocompleteProps<T> {
  staticData?: string[]; // Array of static suggestions
  fetchSuggestions: (query: string) => Promise<T>; // Function to fetch suggestions
  placeholder?: string; // Placeholder text for the input
  customloading?: string; // Custom loading text
  onSelect: (suggestion: string) => void; // Callback for when a suggestion is selected
  onBlur?: () => void; // Callback for when the input loses focus
  onFocus?: () => void; // Callback for when the input gains focus
  onChange?: (value: string) => void; // Callback for when the input value changes
  customStyles?: CSSProperties; // Custom styles for the input
  dataKey?: string; // Key to access suggestion data
}

const AutoComplete = <T,>({placeholder, fetchSuggestions, onSelect}: AutocompleteProps<T>): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");
    const [suggestion, setSuggestions] = useState<string[]>([]);
    const debouncedQuery = useDebounce(inputValue, 1000);
    const [select, setSelect] = useState(false);
    const [loading, setLoading] = useState(false);


    const onSelectHandler = (item: string) => {
        onSelect(item);
        setInputValue(item);
        setSuggestions([]);
         setSelect(true)
    }

    const getSuggestions = async (query: string) => {
        setLoading(true)
         const data = await fetchSuggestions(query);
        if(Array.isArray(data)) {
         const item = data.map((item) => item.title);
         setSuggestions(item);
         setLoading(false)
        }
           
        
         if(!query || query.length < 2) {
            setSuggestions([]);
         }
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setInputValue(e.target.value);
        setSelect(false);
    }

     useEffect(() => {
    if (debouncedQuery) {
        if(debouncedQuery.length > 1 && !select) {
            getSuggestions(debouncedQuery)
        } else {
            setSuggestions([]);
        }
    }
  }, [debouncedQuery]);

    return (
        <div className="container">
            <input 
             type="text"
             value={inputValue}
             placeholder={placeholder}
             onChange={changeHandler}
             />
            {loading ? <p>loading.....</p> : <SuggestionList suggestions={suggestion} dataKey={"name"} onSelect={onSelectHandler} /> }
        </div>
    )
}

export default AutoComplete