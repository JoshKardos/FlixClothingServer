const express = require('express')
const path = require('path')
const stripe = require('stripe')('sk_test_c8WpTVTZOQnrqvqWXJJLaTeQ00whht62Tb')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const a = express()
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

