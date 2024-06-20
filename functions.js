import fetch from 'node-fetch';
import fs from 'fs'

const apiKey = "931da1a2c7f202862dad71c6eb8cd3dd";
let uvData = {};

export const data = async () => {
    let meteoCityData = await fetch('https://www.meteocity.com/map/data/8?version=4&state=now');
    meteoCityData = await meteoCityData.json();
    meteoCityData = meteoCityData.data.map.days;
    let objKeys = Object.keys(meteoCityData);
    meteoCityData = meteoCityData[objKeys[0]].morning;
    
    for (let el of meteoCityData) {
        let weatherDt = await weather(el.latitude, el.longitude);
        let weatherArr = weatherDt.daily;
        for (let e of weatherArr) {
            let dateKey = formatDate(e.dt);
            if (!uvData[dateKey]) {
                uvData[dateKey] = [];
            }
            uvData[dateKey].push({
                label: el.label,
                latitude: el.latitude,
                longitude: el.longitude,
                uvi: e.uvi
            });
        }
    }
    
    return uvData;
};

const weather = async (lat,lon)=>{
    let weatherData = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts,&appid=${apiKey}`)
    weatherData=weatherData.json()
    return weatherData
}


function formatDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }