const { response,request } = require('express');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const validateJwt = (req=request,res=response,next) =>{
    const token = req.header('x-token')
    if (!token){
        return res.status(400).json({
            msg:'No hay token en la peticion'
        })
    }
    try {
        jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        next()
    } catch (error) {
        return res.status(401).json({
            error,
            msg:'Token no valido'
        })
    }

}

module.exports=validateJwt;