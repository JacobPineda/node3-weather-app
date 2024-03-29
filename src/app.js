const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


const app = express()
const port = process.env.PORT || 3000

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
  res.render('index', {
      title: 'Weather',
      name: 'xD'
  })
})


app.get('/help', (req,res) => {
    res.render('help',{
        title: "Help",
        name: 'XD',
        message: "here help plz xDDD"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'XD'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})  
        }
        
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})  
            }        
            
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })

})

// app.get('/products', (req, res) => {

//     if(!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        error: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + 3000)
})