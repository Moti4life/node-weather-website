const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

/* console.log(__dirname)
console.log(path.join(__dirname, '../public')) */


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

//if you want to customize 'views' path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up hanndle bars engine
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//set views path to new path
app.set('views', viewsPath)

// setup statci directory to serve
app.use(express.static(publicDirectoryPath))


//here are the routes 
//for blank homepage
//this get gets views to render index file

//request //response

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather 6000',
        name: 'moti que'
    })

})

// for /about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'merlioown'
    })

})

// for /help
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is a help page',
        title: 'HELP',
        name: 'motisan'
    })

})




app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
             error: 'must provide address'
         })
     }
    
     
    else{
        geoCode(req.query.address, (error, {latitude, longtitude, locationName} = {} ) => {
            console.log(locationName)
            if(error){
                return res.send({
                    error: error
                })
            }
            else{
            forecast(latitude, longtitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location: locationName,
                    address: req.query.address
                })
            })
        }
    
        })
    }

    /* res.send({
        location: 'maninila',
        forecast: 'cloudy',
        address: req.query.address
    }
) */

})

app.get('/products', (req, res) => {
    if (!req.query.search){
       return res.send({
            error: 'no search terms found, must provide terms'
        })
    }
    
    console.log(req.query.search)

    res.send({
        products: []
    })
})


// app.com ('')
// app.com/help
// app.com/about


app.get('/help/*' , (req, res) => {
    res.render('error404', {
        title: '404',
        errorMessage: 'help article about this not found',
        name: 'ceasar'
    })
})

//404 should always be last
app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        errorMessage: 'error 404 suss page not found',
        name: 'ceasarmeng'
    })
})

app.listen(3000, () => {
    console.log('server started on port 3000')
})


