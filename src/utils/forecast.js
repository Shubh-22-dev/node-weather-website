const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/a317dbdbc393c9b66abeaaa47a63881b/'+ lat +','+long

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location!', undefined)
        }else{
            var result = body.daily.data[0].summary + ' It is currently '+ body.currently.temperature +' degrees out. There is a '+ body.currently.precipProbability +'% chance of rain.'
            callback(undefined, result)
        }

    })
    
}

module.exports = forecast