import React, {FC} from "react";
import {CityType} from "../../Redux/Reducers/citiesReducer";
import {getDiffTime, getFullData, getTime} from "../../Redux/commonMehods";
import SCity from "./stylesCityCard.module.css";
import SCommon from "../../common.module.css";
import Sunrise from "../../img/WeatherCard/sunrise.svg"
import Sunset from "../../img/WeatherCard/sunset.svg";
import Wind from "../../img/WeatherCard/wind.svg";
import SandClock from "../../img/WeatherCard/sand-clock.svg";
import Pressure from "../../img/WeatherCard/pressure.svg";
import Humidity from "../../img/WeatherCard/humidity.svg";
import Tag from "../../img/WeatherCard/tag.svg";
import Day from "../../img/Backgrounds/day.svg";
import Night from "../../img/Backgrounds/night.svg";
import {CardItem} from "../Common/cardItem";


type PropsType = {
    choose: boolean
    current: CityType
    setChoose: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}


export const CityCard: FC<PropsType> = (props) => {
    let dataNow: any = ''
    let sunrise: string = ''
    let sunset: string = ''
    let differ: string = ''
    if (Object.keys(props.current).length > 0) {
        dataNow = getFullData(props.current.dt)
        sunrise = getTime(props.current.sys.sunrise)
        sunset = getTime(props.current.sys.sunset)
        differ = getDiffTime(sunrise, sunset)
    }
    const container = `${SCity.container__marginAuto} ${SCity.container_items__little} ${SCity.container_items__marginUpBottom}`
    const containerParam = `${SCity.container__marginAuto}`
    const paramInfo = `${SCity.container_paramInfo__decor}`
    const paramName = `${SCity.container_paramName__decor}`
    const background = +getTime(props.current.dt).split(':')[0]
    const photo = background > 18 && Night || background < 4 && Night || Day
    return (
        <div>
            {Object.keys(props.current).length > 0 &&
                <div>
                    <div>
                        <img className={SCity.container_background__width} src={photo} alt=""/>
                    </div>
                    <div className={`${SCity.container__positionBottom} ${SCity.container__background}`}>
                        <div className={`${SCommon.container_items__displayFlex}`}>
                            <div className={`${SCity.container_header__margins} ${SCity.container_header__fs} ${SCity.container_header__opacity}`}>
                                {dataNow}
                            </div>
                            <div className={`${SCity.container_header__margins} ${SCity.container_header__fs} ${SCity.container_headerCity__blueBack}`}>
                                <span>{props.current.name}, {props.current.sys.country}</span>
                                <img onClick={() => props.setChoose(true)} className={SCity.container_tagPhoto__width} src={Tag} alt=""/>
                            </div>
                        </div>
                        <div className={SCommon.container_items__displayFlex}>
                            <div className={container}><span className={SCity.container_mainTemp__boldFont}>{props.current.weather[0].main}</span></div>
                            <div className={container}>
                                <span className={SCity.container_mainTemp__boldFont}>{props.current.main.temp}</span>
                                <span className={SCity.container_celsius__upText}>&#8451;</span>
                            </div>
                            <div className={container}>
                                <div>
                            <span
                                className={SCity.container_minMaxTemp__opacity}
                            >{props.current.main.temp_max}&#8451;
                            </span>
                                    <span
                                        className={`${SCity.container_minMaxTemp__opacity} ${SCity.container_minMaxArrow__alighUp} ${SCity.container_minMaxArrow__fs}`}
                                    >&#8593;
                            </span>
                                </div>
                                <div>
                            <span className={SCity.container_minMaxTemp__opacity}>
                            {props.current.main.temp_min}&#8451;
                            </span>
                                    <span
                                        className={`${SCity.container_minMaxTemp__opacity} ${SCity.container_minMaxArrow__alighDown} ${SCity.container_minMaxArrow__fs}`}
                                    >&#8595;
                            </span>
                                </div>
                            </div>
                        </div>
                        <div className={SCommon.container_items__displayFlex}>
                            <CardItem container={container} containerParam={containerParam}
                                      param={`${props.current.main.humidity}%`}
                                      paramInfo={paramInfo} paramName={paramName} name={'Humidity'} photo={Humidity}
                            />
                            <CardItem container={container} containerParam={containerParam}
                                      param={`${props.current.main.pressure}mBar`}
                                      paramInfo={paramInfo} paramName={paramName} name={'Pressure'} photo={Pressure}
                            />
                            <CardItem container={container} containerParam={containerParam}
                                      param={`${props.current.wind.speed}km/h`}
                                      paramInfo={paramInfo} paramName={paramName} name={'Wind'} photo={Wind}
                            />
                        </div>
                        <div className={SCommon.container_items__displayFlex}>
                            <CardItem container={container} containerParam={containerParam} param={sunrise}
                                      paramInfo={paramInfo} paramName={paramName} name={'Sunrise'} photo={Sunrise}
                            />
                            <CardItem container={container} containerParam={containerParam} param={sunset}
                                      paramInfo={paramInfo} paramName={paramName} name={'Sunset'} photo={Sunset}
                            />
                            <CardItem container={container} containerParam={containerParam} param={differ}
                                      paramInfo={paramInfo} paramName={paramName} name={'Day time'} photo={SandClock}
                            />
                        </div>
                    </div>
                </div>
            }
            {Object.keys(props.current).length === 0 &&
            <div className={`${SCity.container__background}`}>
                <div onClick={() => props.setChoose(true)} className={`${SCity.container_notChose__width} ${SCity.container_notChose__font}`}>
                    <span>City not chosen!</span>
                    <span>Chose!</span>
                </div>
            </div>}
        </div>
    )
}
