import { useEffect, useState } from "react";

const useDebounce = <T,>(value: T, delay: number): T => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
 console.log("run c useeffect")
        return () => {
            clearTimeout(timer);
            console.log("run c close useeffect")
        };
    }, [value, delay])
    return debounceValue
}

export default useDebounce;