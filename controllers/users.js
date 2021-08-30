const {response} = require('express')

const getUser= (req, res=response)=> {
    const {name,lastname} = req.query
    res.json({
        msg:'Este es el get',
        name,
        lastname
    })
}

const postUser=(req,res=response)=>{
    const body = req.body;
    const id = req.params.id
    res.json({
        msg:'Este es el post',
        id
    })
}

const deleteUser= (req, res=response)=>{
    res.json({
        msg:'Este es del DELEte'
    })
}

const patchUser= (req, res=response)=>{
    res.json({
        msg:'Este es del PATCH'
    })
}

module.exports = {
    getUser,
    postUser,
    deleteUser,
    patchUser}