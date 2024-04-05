const express = require('express')
const routes = express.Router();

routes.get('/',(req,res)=>{
    const locals = {
        title:'SignIn Page'
    }
  res.render('user',{locals});
})

routes.get('/signup',(req,res)=>{{
    const locals = {
        title:'Sign Up Page'
    }
    res.render('signup',{locals})
}})

module.exports = routes;