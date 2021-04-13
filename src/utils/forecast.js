const postmanRequest = require('postman-request')

const forecast = (lat, lon, callback) => {

    
    //const url = 'http://api.weatherstack.com/current?access_key=dfbd28c68e662deab875bc820cea8f15&query='+ lat + ',' + lon
      
    const url = 'http://api.weatherstack.com/current?access_key=dfbd28c68e662deab875bc820cea8f15&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon)

    //console.log(url)
    postmanRequest({ url: url, json: true }, (error, response) => { 

        if (error) {
            callback('unable to connect to weather services', undefined)
            
        }

        else if (response.body.error){
            callback('unable to find location', undefined)
        }

        else {
            callback(undefined, /* {
                temperature: response.body.current.temperature,
                precipitation: response.body.current.precip,
                feelslike: response.body.current.feelslike,
                description: response.body.current.weather_descriptions[0],
                name: response.body.location.name
            } */
            ('It is currently: ' + response.body.location.localtime + ' local time.' +' Temperature is: '+ response.body.current.temperature + " but feels like: " + response.body.current.feelslike + ". The weather is: "+ response.body.current.weather_descriptions[0] + ' with a '+ response.body.current.precip + ' chance of rain with a humidity of: ' + response.body.current.humidity )
            )
        }
        
    })
}

module.exports = forecast
