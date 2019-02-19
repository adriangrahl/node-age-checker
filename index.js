const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const checkEmptyAge = (req, res, next) => {
  const { age } = req.query
  return age ? next() : res.redirect('/')
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  return res.redirect(`/${age >= 18 ? 'major' : 'minor'}?age=${age}`)
})

app.use(checkEmptyAge)

app.get('/major', (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.listen(3000, 'localhost')
