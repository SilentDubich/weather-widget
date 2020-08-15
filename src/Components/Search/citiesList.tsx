import React, {FC} from "react";
import {CityType} from "../../Redux/Reducers/citiesReducer";

type PropsType = {
    choose: boolean
    cities: Array<CityType>
    setChoose: (value: boolean | ((prevVar: boolean) => boolean)) => void
    setCity: (data: CityType) => void
    deleteCity: (id: number) => void
}


export const CitiesList: FC<PropsType> = (props) => {
// @ts-ignore
    const cities = props.cities.sort((prev: CityType, next: CityType) => {
        if (prev.name < next.name) return -1
        if (prev.name < next.name) return 1
    }).map((el: any, i: number) =>
        <div key={el.id}>
            <div onClick={() => props.setChoose(false)}>
                <div>
                    {props.cities[i - 1] === undefined &&
                    <b>{props.cities[i].name[0]}</b> || props.cities[i - 1].name[0] !== props.cities[i].name[0] &&
                    <b>{props.cities[i].name[0]}</b>}
                </div>
                <div onClick={() => props.setCity(el)} key={el.id}>
                    <span>{el.name}</span>
                    <span>{el.sys.country}</span>
                    <span>{el.main.temp}</span>
                </div>
            </div>
            <div>
                <button onClick={() => props.deleteCity(el.id)}>Delete</button>
            </div>
        </div>)
    return (
        <div>{cities}</div>
    )
}
