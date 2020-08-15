import React, {FC} from "react";
import SCity from "../CityCardInfo/stylesCityCard.module.css";
import Humidity from "../../img/WeatherCard/humidity.svg";

type PropsType = {
    container: string
    containerParam: string
    paramInfo: string
    paramName: string
    param: string
    name: string
    photo: string
}

export const CardItem: FC<PropsType> = (props) => {
    return (
        <div className={props.container}>
            <div className={props.containerParam}><img src={props.photo} alt=""/></div>
            <div className={props.containerParam}><span className={props.paramInfo}>{props.param}</span></div>
            <div className={props.containerParam}><span className={props.paramName}>{props.name}</span></div>
        </div>
    )
}
