import type { JSX } from "react";
import { useEffect, useState } from "react";
import Button from "./Button";

interface Props {
    title: string,
    children?: React.ReactNode
}

const config = new Array<number>(9).fill(0);

const GridLight = (props: Props): JSX.Element => {
    const [state, setState] = useState<number[]>([]);
    
    const clickHandler = (index: number) => {
        const order = [...state, index];
        setState(order);
        if(order.length === config.length) {
            removeSelection();
        }
    }

    const removeSelection = () => {
        const timer = setInterval(() => {
            setState((prevState) => {
                const newOrder = prevState.slice();
                newOrder.pop();
             if(newOrder.length == 0) {
                clearInterval(timer);
                }
                return newOrder;
            })
        }, 1000)
    }
    
    return (
        <>
        <h1>{props.title}</h1>
        <div className="layout">
            {config.map((item, index) => (
                 <Button
                  key={index+item}
                  bgColor = {state.includes(index) ? "green" : "white"}
                  className="btn-custom"
                    onClick={() => !state.includes(index) && clickHandler(index)}
                  >
                 </Button>
            ))}
        </div>
        </>
    )
}

export default GridLight;