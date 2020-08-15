import {AppStateType, InferActionsTypes} from "../store";
import {ThunkAction} from "redux-thunk";
import {api} from "../api";
import {getCities, updLocalStorage} from "../commonMehods";


type ActionCitiesTypes = InferActionsTypes<typeof citiesActions>
export type ThunkCitiesType = ThunkAction<Promise<void>, AppStateType, unknown, ActionCitiesTypes>

export const citiesActions = {
    addCity: (data: CityType) => ({type: 'citiesReducer/addCity', data} as const),
    deleteCity: (id: number) => ({type: 'citiesReducer/deleteCity', id} as const),
    setCity: (data: CityType) => ({type: 'citiesReducer/setCity', data} as const),
    uploadCities: (cities: Array<CityType>) => ({type: 'citiesReducer/uploadCities', cities} as const),
    updText: (text: string) => ({type: 'citiesReducer/updText', text} as const),
    setError: (data: ErrorType) => ({type: 'citiesReducer/setError', data} as const),
    setInit: () => ({type: 'citiesReducer/setInit'} as const)
}

export type ErrorType = {
    resultCode?: number
    errors?: Array<string>
}

// добавление города в стэйт и лока сторадж, если города нет, то выбрасывается ошибка
export const addCityThunk = (city: string): ThunkCitiesType => {
    return async (dispatch) => {
        try {
            let data = await api.getCityByName(city)
            updLocalStorage('add', data.id, data)
            dispatch(citiesActions.addCity(data))
            dispatch(citiesActions.setError({}))
            dispatch(citiesActions.setCity(data))
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
// Данная санка загружает из локал стораджа города и загружает в стэйт
export const uploadCitiesThunk = (): ThunkCitiesType => {
    return async (dispatch) => {
        const maxPortion = 20
        let allCities = getCities()
        // количество запросов на сервер
        let chunks = Math.ceil(allCities.length / maxPortion)
        let list: Array<CityType> = []
        for (let i = 0; i < chunks; i++) {
            let request = allCities.slice(i * maxPortion, i * maxPortion + maxPortion)
            let data = await api.getCitiesById(request.join(','))
            data.list.forEach((el: CityType) => list.push(el))
        }
        dispatch(citiesActions.uploadCities(list))
        dispatch(citiesActions.setInit())
    }
}
// Метод не вошел тк данный мне апикей не подходит для запросов прогнозов на несколько дней
// export const setCurrentCity = (id: number, count: number): ThunkCitiesType => {
//     return async (dispatch) => {
//         const data = api.getSeveralDayForecast(id, count)
//         // dispatch(citiesActions.setCity(data))
//     }
// }

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
    errors: {} as ErrorType,
    isInit: false,
    isFetch: false
}

type initialStateType = typeof initialState

export const citiesInstructions = (state = initialState, action: ActionCitiesTypes): initialStateType => {
    switch (action.type) {
        case "citiesReducer/addCity":
            return {...state, citiesList: [...state.citiesList, action.data], text: ''}
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
        case "citiesReducer/setInit":
            return {...state, isInit: true}
        default:
            return state
    }
}
