import React, {FC} from "react";
import {CityType, getTime} from "../../Redux/Reducers/citiesReducer";

type PropsType = {
    choose: boolean
    current: CityType
    setChoose: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}


export const CityCard: FC<PropsType> = (props) => {
    return(
        <div onClick={ () => props.setChoose(true)}>
            {Object.keys(props.current).length > 0 &&
                <div>
                    <div>
                        <div>{props.current.main.temp}</div>
                        <div>{props.current.main.temp_max}</div>
                        <div>{props.current.main.temp_min}</div>
                    </div>
                    <div>
                        <div>{props.current.main.temp}</div>
                        <div>{props.current.main.temp_max}</div>
                        <div>{props.current.main.temp_min}</div>
                    </div>
                    <div>
                        <div>{getTime(props.current.sys.sunrise)}</div>
                        <div>{getTime(props.current.sys.sunset)}</div>
                    </div>
                </div>
            }
            <span>city</span>
        </div>
    )
}
