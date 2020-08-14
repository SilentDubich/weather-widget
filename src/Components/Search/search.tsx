import React, {FC} from "react";

type PropsType = {
    text: string
    updText: (text: string) => void
    addCity: (city: string) => void
}

export const Search: FC<PropsType> = (props) => {
    let ref = React.createRef<HTMLInputElement>()
    const updateCurrentText = () => {
        if (ref.current) {
            props.updText(ref.current.value)
        }
    }
    return(
        <div>
            <input onChange={updateCurrentText} ref={ref} value={props.text}/>
            <button onClick={() => props.addCity(props.text)}>Найти город</button>
        </div>
    )
}
