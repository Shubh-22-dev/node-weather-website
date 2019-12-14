const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')// using path module to point towards the required directory
const viewsPath = path.join(__dirname, '../templates/views') //specifying a new path instead of the default view folder in project root directory which express can use to render the pages
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs') // set() allows to set a value for a given express setting . It is a key value pair. Key name i.e 'view engine' should be spelled exactly 
// by default express searches for a folder named view in the project root directory to get the pages to be rendered 
app.set('views', viewsPath) // specifying the new location to look for the pages to be rendered
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //customising the server to serve the public folder to serve the html file

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Shubhkarman Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shubhkarman Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a help page.',
        title: 'Help',
        name: 'Shubhkarman Singh'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'Provide address'            
        })
    }


    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude,longitude, (error, forecastData) => {
                if (error) {
                    res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => { // match the request that starts with '/help/' and perform required operation
    res.render('404', {
        title: '404',
        errorText: 'Help article not found.',
        name: 'Shubhkarman Singh'
    })
})

app.get('*', (req, res) => { // * is a wildcard character which is provided by express and it means match anything that hasnt been matched so far
    res.render('404', {
        title: '404',
        errorText: 'Page Not Found.',
        name: 'Shubhkarman Singh'
    })
})

app.listen(3000, () => {
    console.log('Server is up and runnning')
})
