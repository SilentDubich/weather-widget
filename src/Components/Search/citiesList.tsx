import React, {FC} from "react";
import {CityType} from "../../Redux/Reducers/citiesReducer";
import SCities from "./stylesCitiesList.module.css"
import SCommon from "../../common.module.css";

type PropsType = {
    choose: boolean
    cities: Array<CityType>
    setChoose: (value: boolean | ((prevVar: boolean) => boolean)) => void
    setCity: (data: CityType) => void
    deleteCity: (id: number) => void
}


export const CitiesList: FC<PropsType> = (props) => {
    const setCity = (data: CityType) => {
        props.setCity(data)
        props.setChoose(false)
    }
// @ts-ignore
    const cities = props.cities.sort((prev: CityType, next: CityType) => {
        // сортирует города по алфавиту
        if (prev.name < next.name) return -1
        if (prev.name < next.name) return 1
    }).map((el: any, i: number) =>
        <div key={el.id}>
            <div className={SCities.items_upper__decor}>
                {props.cities[i - 1] === undefined &&
                <b>{props.cities[i].name[0]}</b> || props.cities[i - 1].name[0] !== props.cities[i].name[0] &&
                <b>{props.cities[i].name[0]}</b>}
            </div>
            <div className={`${SCommon.container_items__displayFlex}`}>
                <div className={`${SCities.items_font__margin} ${SCities.cursor}`} key={el.id} onClick={() => setCity(el)}>
                    <span className={`${SCities.items_font__decor}`}>{el.name},</span>
                    <span className={`${SCities.items_font__decor}`}>{el.sys.country}</span>
                </div>
                <div>
                    <span className={`${SCities.items_font__decor} ${SCities.items_temp__margin}`}>{Math.ceil(el.main.temp)}&#8451;</span>
                </div>
                <div>
                    <button className={SCities.deleteButton__decor} onClick={() => props.deleteCity(el.id)}><span>&#10005;</span></button>
                </div>
            </div>
        </div>)
    return (
        <div className={SCities.container__background}>
            {cities}
        </div>
    )
}
