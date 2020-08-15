import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {Search} from "./Components/Search/search";
import {CitiesList} from "./Components/Search/citiesList";
import {CityCard} from "./Components/CityCardInfo/cityCard";
import {connect} from "react-redux";
import {AppStateType} from "./Redux/store";
import {
    addCityThunk,
    citiesActions,
    CityType,
    deleteCityThunk,
    ErrorType,
    uploadCitiesThunk
} from "./Redux/Reducers/citiesReducer";
import {Preloader} from "./Components/Common/Preloader/preloader";

type PropsType = {
    cities: Array<CityType>
    currentCity: CityType
    updText: (text: string) => void
    err: ErrorType
    text: string
    isInit: boolean
    getCities: () => void
    addCity: (city: string) => void
    uploadCities: () => void
    setCity: (data: CityType) => void
    deleteCity: (id: number) => void
}

export const App: FC<PropsType> = (props) => {
    const [chooseCity, setChooseCity] = useState(false)
    useEffect(() => {
        props.uploadCities()
    }, [])
    if (!props.isInit) return <Preloader/>
    return (
        <div>
            {chooseCity ?
                <div>
                    <Search addCity={props.addCity} text={props.text} updText={props.updText}/>
                    {props.err.errors && props.err.errors[0]}
                    <CitiesList deleteCity={props.deleteCity} setCity={props.setCity} cities={props.cities} choose={chooseCity} setChoose={setChooseCity}/>
                </div>
                :
                <div>
                    <CityCard current={props.currentCity} choose={chooseCity} setChoose={setChooseCity}/>
                </div>
            }
        </div>
    );
}

let mapStateToProps = (state: AppStateType) => {
    return {
        cities: state.citiesReducer.citiesList,
        currentCity: state.citiesReducer.currentCity,
        text: state.citiesReducer.text,
        err: state.citiesReducer.errors,
        isInit: state.citiesReducer.isInit
    }
}

export const AppWrapper = connect(mapStateToProps,
    {
        getCities: uploadCitiesThunk,
        updText: citiesActions.updText,
        addCity: addCityThunk,
        uploadCities: uploadCitiesThunk,
        setCity: citiesActions.setCity,
        deleteCity: deleteCityThunk
    })(App)
