import {applyMiddleware, combineReducers, createStore} from "redux";
import {citiesInstructions} from "./Reducers/citiesReducer";
import thunk from "redux-thunk";


let allReducers = combineReducers({
    citiesReducer: citiesInstructions
})

type StoreType = typeof allReducers
export type AppStateType = ReturnType<StoreType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export const store = createStore(allReducers, applyMiddleware(thunk))
//@ts-ignore
window.store = store
