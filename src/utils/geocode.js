const request = require("postman-request");

const getGeocode = (location, callback) => {
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location +".json?access_token=pk.eyJ1IjoiamFuYWd1ZXZlcmEwNyIsImEiOiJjbGtiMXJ5eHYwYzdiM2RxZDYxdXY1YmlrIn0.cJkxhMSKEigbFYhwaOWxag";

    request({url: geocodeUrl, json: true}, (error, response) => {
        if(error){
            callback("Please check your internet connection!", undefined);
        }else if(response.body.features.length === 0){
            callback("Unable to fetch geocode. Location doesnt exist!", undefined)
        }else{
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            }

            callback(undefined, data);
        }
    });
}

module.exports = getGeocode;