const express = require('express');

const request = require('request-promise');
const app = express();
const PORT  = process.env.PORT || 5000;

// const apiKey ='a7c46fb68690542ca4323c95b3081cbc'

const generateScraperUrl =(apiKey)=> `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());


app.get('/',(req , res)=>{
    res.send("Welcome to amazon scrber Api") ;
})


//GET PRODUCT DETAILS
app.get('/product/:productId', async(req,res)=>{
    const {productId} = req.params;
    const {api_key} =req.query ;
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)

        res.json(JSON.parse(response))
    }catch(error){
res.json(error)
    }
})


//GET PRODUCT REVIEWS   
app.get('/product/:productId/reviews', async(req,res)=>{
    const {productId} = req.params;
    const {api_key} =req.query ;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)

        res.json(JSON.parse(response))
    }catch(error){
res.json(error)
    }
})

//GET PRODUCT offers   
app.get('/product/:productId/offers', async(req,res)=>{
    const {productId} = req.params;
    const {api_key} =req.query ;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)

        res.json(JSON.parse(response))
    }catch(error){
res.json(error)
    }
})

//GET SEARCH RESULTS 
app.get('/search/:searchQuery', async(req,res)=>{
    const {searchQuery} = req.params;
    const {api_key} =req.query ;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)

        res.json(JSON.parse(response))
    }catch(error){
res.json(error)
    }
})
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})