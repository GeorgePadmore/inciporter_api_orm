const axios = require('axios');

module.exports = {

    FetchWeather: (city) =>  {

        try {
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_TOKEN}`)
        } catch (error) {
            // console.error(error);
            throw error;
        }
    },
}