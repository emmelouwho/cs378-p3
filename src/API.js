
export async function buildURl(){
    //https://api.open-meteo.com/v1/forecast?latitude=30.27&longitude=-97.74&hourly=temperature_2m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago
}


export async function fetchWeatherData(url){
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        
    }
}

export async function fetchGeoData(searchInput){
    try {
        const url = 'https://geocoding-api.open-meteo.com/v1/search?name=' + searchInput;
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        
    }
}