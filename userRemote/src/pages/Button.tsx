import {  type FC, type MouseEvent } from "react"

type Props = {
    children: React.ReactNode,
    color?: string,
    bgColor?: string,
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<Props> = ({color = "white", bgColor = "green", children, onClick}) => {

    return (
        <>
            <button type="button" 
            style={{color: color, backgroundColor: bgColor}} 
            onClick={onClick} >
                {children}
            </button>
        </>
    )
}


export default Button