const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid');
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
const ApiKeys = require('./ApiKeys')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


app.post('/api/form', (req, res) => {
  const { designId } = req.body 
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
      <div style="border: 1px solid grey; padding:12px;">
        <h1 style="text-align:center; text-decoration:underline">Flix Clothing</h3>
        <h3 style="text-align:center; text-decoration:underline">A design was just reported by a user</h3>
        <div style="text-align: center;">
          <p>Design Id: ${designId} <p>
        </div>
      </div>
    `
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: ApiKeys.sendGridKey
      })
    )
    const toEmail = 'joshkardos@gmail.com'
    const mailOptions = {
      from: 'Flix Clothing <joshkardos@gmail.com>',
      to: toEmail,
      replyTo: 'noreply@gmail.com',
      subject: 'Reported design',
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).end()
        return
      }
      console.log('Email sent')
      res.status(200).send()
    })
  })
})
  