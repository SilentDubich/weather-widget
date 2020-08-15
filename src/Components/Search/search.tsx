import React, {FC} from "react";
import SCities from "./stylesCitiesList.module.css";
import Tag from "../../img/WeatherCard/tag.svg"

type PropsType = {
    text: string
    setChose: (value: boolean | ((prevVar: boolean) => boolean)) => void
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
    const setCity = () => {
        props.addCity(props.text)
        props.setChose(false)
    }
    return(
        <div className={SCities.input__margin}>
            <div>
                <input className={SCities.input__decor} onChange={updateCurrentText} ref={ref} value={props.text}/>
                <span className={SCities.button__position} onClick={setCity}><img src={Tag}/></span>
            </div>
        </div>
    )
}
