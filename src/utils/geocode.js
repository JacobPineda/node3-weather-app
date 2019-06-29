const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlndWVscGluZWRhIiwiYSI6ImNqeGRsMzUzcTBmY2Uzb213eHU1aWhvMHgifQ.6dsJwn3_molxlYxUHJn44A&limit=1'
    request({url, json: true}, (error,{body}) => {
      // console.log(response.body.features[0].place_name)
      if(error)
        callback('Unable to connect to location service', undefined)
      else if (body.features.length === 0){
        callback('Unable to find location', undefined)
      }
      else
        callback(undefined,{
          location: body.features[0].place_name,
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1]
        })
        //console.log("Longitude: " + response.body.features[0].center[0] + "\nLatitude: " + response.body.features[0].center[1])
      //console.log(response.body.currently)
      //console.log(response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain.")
      
    })
  }
  


module.exports = geocode