import type { JSX } from "react";

type Props = {
    suggestions: string[],
    highlight?: string,
    onSelect: (item: string) => void,
    dataKey?: string
}

const SuggestionList = ({suggestions = [], dataKey = "", onSelect }: Props): JSX.Element => {

    return (
        <ul>
        {suggestions.map((item, key) => {
           return <li 
           key={key}
           onClick={() => onSelect(item)}

           >{item}</li>
        })}
        </ul>

    )
}

export default SuggestionList;