const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0a5ece8a02844df545774fcc3a59d682&query='+latitude+','+longitude

 
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,  ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.'+' humidity is '+body.current.humidity)
        }
    })
}

module.exports = forecast