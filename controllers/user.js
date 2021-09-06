const { response } = require('express');
const { generateJwt } = require('../helpers/generate-jwt');


const User = require('../models/user')



const register = async (req, res = response) => {
    const user = req.body;
    try {
        const new_user = await User.create(user);
        return res.send(new_user);
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

const login = async (req,res=response)=>{
    const {mail,password}=req.body;
    try {
        const user = await User.findOne({mail});
        console.log(user)
        if (!user){
            return res.status(400).json({
                msg:'Usuario invalido'
            })
        }
        if (password===user.password){
            console.log('logueado')
            const token = await generateJwt(user._id)
            res.json({
                msg:'ok',
                token
            })
        }
        else{
            res.json({
                msg:'Contraseña incorrecta'
            })
        }
    } catch (error) {
        return res.status(400).json({
            error
        })
    }

}



module.exports = {
    register,
    login
}