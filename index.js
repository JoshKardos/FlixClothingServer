const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid');
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


app.post('/api/form', (req, res) => {
  const { adminEmail, senderName, downloadUrl } = req.body 
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
      <div style="border: 1px solid grey; padding:12px;">
        <h3 style="text-align:center; text-decoration:underline">${senderName} just submitted a timesheet</h3>
        <div style="text-align: center;">
          <button style="height:60px; width:200px; margin: 0 auto;">
            <a style="text-decoration:none;" href=${downloadUrl}>Click to download</p>
          </button>
        </div>
      </div>
    `
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: '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'
      })
    )
    const toEmail = process.env.NODE_ENV === 'production' ? adminEmail : 'joshkardos@gmail.com'
    const mailOptions = {
      from: 'JTK Staffing <joshkardos@gmail.com>',
      to: toEmail,
      replyTo: 'noreply@gmail.com',
      subject: 'Timesheet submitted',
      text: adminEmail,
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err)
      console.log('Email sent')
    })
  })
})
  