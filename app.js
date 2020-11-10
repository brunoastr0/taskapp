//var
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const session = require("express-session")
const flash = require("connect-flash")

const path = require('path')

const  admin = require('./routes/admin')
const mongoose = require('mongoose')
require('../task_project/model/task')


const Task = mongoose.model('task')


//config
    //app.use() = middlewares
    //session
        app.use(session({
            secret: 'doralinajesus1',
            resave:true,
            saveUninitialized: true
        }))
        app.use(flash())

    //midlewares
        app.use((req,res,next)=>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    //body parser
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())

    //handlebars
        app.engine('handlebars',handlebars({defaultLayout: 'main'}))
        app.set('view engine','handlebars')
        
    //mongoose
    mongoose.Promise = global.Promise
    //const db = 'mongodb://localhost/taskapp'
    const db = 'mongodb+srv://taskapp:iwenttothebeach2020@cluster0.wccpn.mongodb.net/taskapp?retryWrites=true&w=majority'
    mongoose.connect(db).then(()=>{
        console.log("database`s up")
    }).catch((error)=>{
        console.log(`error ao contecting to database; ${error}`)
    })

    //public/css/js
    app.use(express.static(path.join(__dirname,'public')))

    /*app.use((req,res,next)=>{
        console.log("Middleware")
        next()
    })*/

//Routes

app.get('/',(req,res)=>{
    Task.find().populate('task').lean().sort({data: 'desc'}).then((tasks)=>{
        res.render('index',{tasks:tasks})
    }).catch((error)=>{
        req.flash('error_msg','Houve um erro interno')
        res.redirect('/404')
    })
    
})

app.get('/404',(req,res)=>{
    res.send('error 404')
})

app.use('/admin',admin)




//others
const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log("server connected...")
})