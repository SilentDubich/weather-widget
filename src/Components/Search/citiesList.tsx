import React, {FC} from "react";
import {CityType} from "../../Redux/Reducers/citiesReducer";

type PropsType = {
    choose: boolean
    cities: Array<CityType>
    setChoose: (value: boolean | ((prevVar: boolean) => boolean)) => void
    setCity: (data: CityType) => void
}


export const CitiesList: FC<PropsType> = (props) => {
// @ts-ignore
    const cities = props.cities.sort((prev: CityType, next: CityType) => {
        if (prev.name < next.name) return -1
        if (prev.name < next.name) return 1
    }).map((el: any) => <div onClick={() => props.setCity(el)} key={el.id}><span>{el.name}</span><span>{el.sys.country}</span><span>{el.main.temp}</span></div>)
    return (
        <div onClick={() => props.setChoose(false)}>{cities}</div>
    )
}
