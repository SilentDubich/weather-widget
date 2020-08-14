import axios from "axios"

const API_KEY = '330216f9e3042b8a57a7865c3de67865'
const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/'
})

export const api = {
    getCityByName: (city: string) => {
        return instance.get(`weather?q=${city}&appid=${API_KEY}&units=metric`).then(response => {
            return response.data
        })
    },
    getCitiesById: (ids: string) => {
        return instance.get(`group?id=${ids}&appid=${API_KEY}&units=metric`).then(response => {
            return response.data
        })
    }
}
