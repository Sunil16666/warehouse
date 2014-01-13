const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Item = require('./models/item')
const flash = require('connect-flash')
const session = require('express-session')
const path = require('path')
const methodOverride = require('method-override')
const dotenv = require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/warehouse', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connected to database')
    })
    .catch(err => {
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(session({
    secret: 'vb66Se12eB',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(flash())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    if (!req.query.auth) res.sendStatus(401)
    else if (req.query.auth !== process.env.AUTH) res.sendStatus(403)
    else next()
})

app.get('/', async (req, res) => {
    const items = await Item.find()
    res.render('index', { items })
})

app.get('/items/:id', async (req, res) => {
    const { id } = req.params
    const item = await Item.findById(id)
    res.render('show', { item })
})

app.post('/', async (req, res) => {
    const item = new Item(req.body)
    await item.save()
    res.redirect(`/${item._id}`)
})

app.patch('/items/:id', async (req, res) => {
    const { id } = req.params
    const item = await Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    res.sendStatus(200)
})

app.delete('/items/:id', async (req, res) => {
    const { id } = req.params
    const campground = await Item.findByIdAndDelete(id)
    res.sendStatus(200)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})