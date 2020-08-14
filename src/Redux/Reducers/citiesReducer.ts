import {AppStateType, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";
import {api} from "../api";


type ActionCitiesTypes = InferActionsTypes<typeof citiesActions>
export type ThunkCitiesType = ThunkAction<Promise<void>, AppStateType, unknown, ActionCitiesTypes>

export const citiesActions = {
    addCity: (data: CityType) => ({type: 'citiesReducer/addCity', data} as const),
    deleteCity: (id: number) => ({type: 'citiesReducer/deleteCity', id} as const),
    setCity: (data: CityType) => ({type: 'citiesReducer/setCity', data} as const),
    uploadCities: (cities: Array<CityType>) => ({type: 'citiesReducer/uploadCities', cities} as const),
    updText: (text: string) => ({type: 'citiesReducer/updText', text} as const),
    setError: (data: ErrorType) => ({type: 'citiesReducer/setError', data} as const)
}

export type ErrorType = {
    resultCode?: number
    errors?: Array<string>
}

const getCities = () => {
    let strCities: string | null = localStorage.cities && localStorage.getItem('cities')
    let allCities: Array<number> = []
    if (strCities) allCities = JSON.parse(strCities)
    return allCities
}

export const getTime = (time: number) => {
    let date = new Date(time * 1000);
// Hours part from the timestamp
    let hours = date.getHours();
// Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    debugger
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

export const updLocalStorage = (method: string, id: number, data?: CityType) => {
    let allCities: Array<number> = getCities()
    if (method === 'add') {
        if (data) {
            allCities = allCities.filter(el => el !== id)
            allCities.push(id)
        }
    } else {
        allCities = allCities.filter(el => el !== id)
    }
    // method === 'add' ? allCities = allCities.filter( el => el.id !== id).push(data) : allCities.filter( el => el.id !== id)
    localStorage.setItem('cities', JSON.stringify(allCities))
}

export const addCityThunk = (city: string): ThunkCitiesType => {
    return async (dispatch) => {
        try {
            let data = await api.getCityByName(city)
            updLocalStorage('add', data.id, data)
            dispatch(citiesActions.addCity(data))
            dispatch(citiesActions.setError({}))
        } catch (e) {
            dispatch(citiesActions.setError({resultCode: 1, errors: ['Такого города нет']}))
        }
    }
}
export const deleteCityThunk = (id: number): ThunkCitiesType => {
    return async (dispatch) => {
        updLocalStorage('delete', id)
        dispatch(citiesActions.deleteCity(id))
    }
}
export const uploadCitiesThunk = (): ThunkCitiesType => {
    return async (dispatch) => {
        const maxPortion = 20
        let allCities = getCities()
        let chunks = Math.ceil(allCities.length / maxPortion)
        let list: Array<CityType> = []
        for (let i = 0; i < chunks; i++) {
            let request = allCities.slice(i * maxPortion, i * maxPortion + maxPortion)
            let data = await api.getCitiesById(request.join(','))
            data.list.forEach((el: CityType) => list.push(el))
        }
        dispatch(citiesActions.uploadCities(list))
    }
}
export type CityType = {
    coord: {
        "lon": number
        "lat": number
    },
    weather: [
        {
            "id": number
            "main": string
            "description": string
            "icon": string
        }
    ],
    "base": string
    "main": {
        "temp": number
        "pressure": number
        "humidity": number
        "temp_min": number
        "temp_max": number
    },
    "visibility": number
    "wind": {
        "speed": number
        "deg": number
    },
    "clouds": {
        "all": number
    },
    "dt": number
    "sys": {
        "type": number
        "id": number
        "message": number
        "country": string
        "sunrise": number
        "sunset": number
    },
    "id": number
    "name": string
    "cod": number
}

let initialState = {
    citiesList: [] as Array<CityType>,
    currentCity: {} as CityType,
    text: '',
    errors: {} as ErrorType
}

type initialStateType = typeof initialState

export const citiesInstructions = (state = initialState, action: ActionCitiesTypes): initialStateType => {
    switch (action.type) {
        case "citiesReducer/addCity":
            return {...state, citiesList: [...state.citiesList, action.data]}
        case "citiesReducer/deleteCity":
            return {...state, citiesList: state.citiesList.filter(el => el.id !== action.id)}
        case "citiesReducer/setCity":
            return {...state, currentCity: action.data}
        case "citiesReducer/uploadCities":
            return {...state, citiesList: action.cities}
        case "citiesReducer/updText":
            return {...state, text: action.text}
        case "citiesReducer/setError":
            return {...state, errors: action.data}
        default:
            return state
    }
}
