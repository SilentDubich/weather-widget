import {CityType} from "./Reducers/citiesReducer";
// достает наши города из локал стораджа
export const getCities = () => {
    let strCities: string | null = localStorage.cities && localStorage.getItem('cities')
    let allCities: Array<number> = []
    if (strCities) allCities = JSON.parse(strCities)
    return allCities
}
// переводит дату из юникс формата в формат чч:мм
export const getTime = (time: number) => {
    let date = new Date(time * 1000);
// Hours part from the timestamp
    let hours = date.getHours();
// Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    return `${hours}:${minutes.substr(-2)}`
}
// обновляет локал сторадж в зависимости от метода
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
// вычисляет день светового дня
export const getDiffTime = (sunrise: string, sunset: string) => {
    let sunrArr = sunrise.split(':')
    let sunsArr = sunset.split(':')
    let sunriseTimeMin = (+sunrArr[0] * 60) + (+sunrArr[1])
    let sunsetTimeMin = (+sunsArr[0] * 60) + (+sunsArr[1])
    let differ = sunsetTimeMin - sunriseTimeMin
    let hours = Math.floor(differ / 60)
    let minutes = Math.floor(differ - hours * 60)
    return `${hours}:${minutes}`
}
// переводит юникс дату в обычный формат
export const getFullData = (unix: number) => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let data = new Date(unix * 1000)
    let dayWeek = data.getDay()
    let day = data.getDate()
    let month = data.getMonth()
    let year = data.getFullYear()
    let time = getTime(unix)
    return `${days[dayWeek]}, ${day} ${months[month]} ${year} | ${time}`
}
