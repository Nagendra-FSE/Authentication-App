import {  type FC, type MouseEvent } from "react"

type Props = {
    children?: React.ReactNode,
    color?: string,
    bgColor?: string,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
    className?: string
}

const Button: FC<Props> = ({color = "white", bgColor = "green", children, onClick, className = ""}) => {

    return (
        <>
            <button type="button" 
            style={{color: color, backgroundColor: bgColor}} 
            className={className}
            onClick={onClick} >
                {children}
            </button>
        </>
    )
}


export default Button