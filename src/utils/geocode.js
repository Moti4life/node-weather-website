

const postmanRequest = require('postman-request') //request request is deprecated

const geoCode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibW90aW1hcGJveCIsImEiOiJja243Mm1kOGIwY3diMndvejlkOGE0MDd4In0.nsYaE_ExlD2Y6JTd6fdH0Q&limit=1'

    postmanRequest( { url: geoUrl, json: true }, (error, response) => {

        if (error){
            callback('error with location services', undefined)
        }
        else if(response.body.features.length == 0){
            callback('Unable to find location', undefined)
            //response body empty
        }
        else{
            //console.log(response.body.features[0].place_name)
            callback(undefined, 
                {
                    latitude: response.body.features[0].center[1],
                    longtitude: response.body.features[0].center[0],
                    locationName: response.body.features[0].place_name
                })
            
        }

    } )
    //console.log(geoUrl)
}

module.exports = geoCode
