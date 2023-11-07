const express = require('express');
const app = express();
const path = require('path')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', {products: ''})
})

app.use('/api/scrape', require("./routes/scrape.js"))

app.listen(3000, () => {
  console.log("Running: http://localhost:3000");
});

module.exports = app