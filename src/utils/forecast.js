const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/b635659a498737c28ebf6ba566de4d29/' + latitude + ',' + longitude + '?units=si'
  request({url, json: true}, (error,{body}) => {
    //console.log(response.body.currently)
    if(error)
        callback('Unable to connect to weather service!', undefined)
    else if(body.error){
        callback('Unable to find location', undefined)
    }
    else {
        const chance = body.currently.precipProbability*100;
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + chance + '% chance of rain.')
    }
  })
}

module.exports = forecast

