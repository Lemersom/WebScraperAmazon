const express = require('express')
const router = express.Router()

const axios = require('axios')
const cheerio = require('cheerio')


router.get('/', async (req, res) => {
    let params = req.query.product

    if(params === undefined){
        params = ""
    }
    
    const url = `https://www.amazon.com/s?k=${params}`

    const products = [];

    try{
        const response = await axios.get(url, {
            headers: {
                Accept: "application/json",
                "User-Agent": "axios 0.21.1"
            }
        })

        const $ = cheerio.load(response.data)

        $('.s-asin').each((index, el) => {
            console.log('teste')
            const product = {
                "title": $(el).find('h2 span').text(),
                "rating": $(el).find('.a-spacing-top-micro span').attr('aria-label'),
                "reviews": $(el).find('[href*="#customerReviews"]').text(),
                "imgUrl": $(el).find('.s-image').attr('src')
            } 
            products.push(product)
        });
        
    }
    catch (error){
        console.log(error)
    }
    
    res.render('index', {products: products})
})

module.exports = router