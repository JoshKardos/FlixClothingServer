const express = require('express')
const path = require('path')
const stripe = require('stripe')('sk_test_c8WpTVTZOQnrqvqWXJJLaTeQ00whht62Tb')
const bodyParser = require()
const PORT = process.env.PORT || 5000
const a = express()
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


app.post('/ephemeral_keys', (req, res) => {
  const customerId = req.body.customer_id
  const api_version = req.body.api_version
  stripe.ephemeralKeys.create(
    {customer : customerId},
    {stripe_version: api_version}
  ).then((key) => {
    res.state(200).send(key)
  }).catch((err) => {
    res.status(500).end()
  })
}) 

app.post('/charge', (req, res) => {
  const customerId = req.body.customer_id
  const api_version = req.body.api_version
  stripe.charges.create({
    customer: customer,
    amount: amount,
    currency: currency

  }, (error, charge) => {
    if (error) {
      console.log(err, req.body)
      res.status(500).end()
    } else {
      res.status(200).send()
    }
  })
})

app.post('/create_customer', (req, res) => {
  const email = req.body.email
  const name = req.body.name
  const phone = req.body.phone

  stripe.customers.create({
    email: email,
    name: name,
    phone: phone
  }, (error, charge) => {
    if (error) {
      console.log(err, req.body)
      res.status(500).end()
    } else {
      res.status(200).send()
    }
  })
})