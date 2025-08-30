const express=require('express')
const router=express.Router()
const Note=require('../models/note')
const multer=require('multer')

const upload=multer()



router.post('/create',upload.none(),(req,res)=>{
    const {title,content}=req.body
    console.log(title,content)
     Note.create(title,content,(err,note)=>{
        if(err) console.log(err)
        res.json({status:"ok"})
     })
})

router.get('/viewall',(req,res)=>{
    Note.findAll((err,data)=>{
        if(err) console.log(err)
        res.json({data})
    })
})

router.get('/viewbyid/:id',(req,res)=>{
    Note.findById(req.params.id,(err,data)=>{
        if(err) console.log(err)
        res.json({data})
    })
})

router.post('/updatenote',upload.none(),(req,res)=>{
    const {id,title,content}=req.body
    Note.update(id,title,content,(err,data)=>{
        if(err) console.log(err)
        res.json({status:"ok"})
    })
})

router.post('/deletetask',(req,res)=>{
    const {id}=req.body
    Note.delete(id,(err,data)=>{
        if(err) console.log(err)
            res.json({status:"ok"})
    })
})

module.exports=router