const request = require("postman-request");

const getForecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c213a3f770ad2aa9bfd2492a8b26a5ff&query=" + latitude + "," + longitude;

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback("Please check your internet connection!", undefined);
        }else if(response.body.error){
            callback("Unable to fetch weather. Location doesnt exist!", undefined);
        }else{
            const location = response.body.location.name;
            const temperature = response.body.current.temperature;
            const forecast = "The current weather in " + location + " is " + 
                                temperature + " celsius.";

            callback(undefined, forecast);
        }
    });
}

module.exports = getForecast;