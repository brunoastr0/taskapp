const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const flash = require('connect-flash')
require('../model/task')




const Task = mongoose.model('task')



router.get('/',(req,res)=>{
    res.render('task')
})



router.get('/task',(req,res)=>{
    Task.find().lean().then((tasks)=>{
        res.render('admin/task',{tasks: tasks})
    }).catch((error)=>{
        req.flash('error_msg','Houve um erro ao listar as task')
        res.redirect("/admin")
    })
    
})

router.get('/task/add',(req,res)=>{
    res.render('admin/addtask')
})

router.post('/task/nova',(req,res)=>{

    var errors = []


    if(!req.body.task || typeof req.body.task == undefined || req.body.task == null){
        errors.push({text: 'task invalido'})
    }
    if(!req.body.cliente || typeof req.body.cliente == undefined || req.body.cliente == null){
        errors.push({text: 'cliente invalido'})
    }

    if(!req.body.time || typeof req.body.time == undefined || req.body.time == null){
        errors.push({text: 'tempo invalido'})
    }

    if(errors.length > 0){
        res.render('admin/addtask',{errors: errors})

    }else{
       
    const novaTask = {
        seccao : req.body.seccao,
        trabalho : req.body.task,
        cliente: req.body.cliente,
        data:req.body.time
        

    }

     new Task(novaTask).save().then(()=>{
         req.flash('success_msg','Task adicionada com successo')
        res.redirect('/admin/task')
     }).catch((error)=>{
         console.log(error)
         req.flash('error_msg','Houve um erro ao adicionar task')
         res.redirect('/admin')
     })
    }
    
})

router.get('/task/edit/:id',(req,res)=>{
    Task.findOne({_id:req.params.id}).lean().then((tasks)=>{
        res.render('admin/edittask',{tasks:tasks})
    }).catch((error)=>{
        req.flash("error_msg","Esta task nao existe")
        res.redirect('/admin/task')
    })
    
    
})

router.get('/show/:id',(req,res)=>{
    Task.findOne({_id:req.params.id}).lean().then((tasks)=>{
        res.render('taskShow',{tasks:tasks})
    }).catch((error)=>{
        req.flash("error_msg","Erro ao encontar a tarefa pretendida")
        res.redirect('/')
    })
})


router.post('/task/edit',(req,res)=>{
    Task.findById(req.body.id).then((tasks)=>{
        console.log()
        tasks.seccao = req.body.seccao
        tasks.trabalho = req.body.task
        tasks.cliente = req.body.cliente
        
        

        Task.save().then(()=>{
            req.flash("success_msg","task editada com sucesso")
            res.redirect("/admin/task")
        }).catch((error)=>{
            req.flash('error_msg','houve um erro interno ao editar a task')
        })

    }).catch((error)=>{
        console.log(error)
        req.flash("error_msg","Houve um erro ao editar a task")
        res.redirect('/admin/task')
    })
})

router.post('/task/delete',(req,res)=>{
    Task.remove({_id:req.body.id}).then(()=>{
        req.flash("success_msg","task apagda com sucesso")
        res.redirect('/admin/task')
    }).catch((error)=>{
        req.flash("erro_msg",'Houve um erro ao apagar a task')
        res.redirect('/admin/task')
    })
})



module.exports = router
