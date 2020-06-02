const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000


//Define Paths for express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//Setup handlebars engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//Setup static directory to  serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Gaurav'

    })
})
app.get('/about',(req ,res)=>{
    res.render('about',{
        name:'Gaurav'
    })
}

)
app.get('/help',(req,res)=>{
    res.render('help',{
        message:"I cant access the page",
        title:'Help',
        name:'Gaurav'
    })
})

app.get('/weather', (req, res) => {

if(!req.query.address){
    return res.send({
        error:'Please send a address'
    })
}
else {
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send(
                {
                    forecast:forecastData,
                    location:location,
                    address:req.query.address
                }
            )
        })
    })
}

    
    
})



app.get('/products',(req,res)=>{
    if(!req.query.search){
return res.send({
    error:'you must provide a search term'
})
    }
  console.log( req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Help',
        name:'Gaurav',
        errorMessage:'Help Article not found'
    })
    })

app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'gaurav',
    errorMessage:'Page not found'
})
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})