
export async function fetchWeatherData(item){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${item.latitude}&longitude=${item.longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`
    const data = await weatherApi(url);
    return data;
}   


export async function weatherApi(url){
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