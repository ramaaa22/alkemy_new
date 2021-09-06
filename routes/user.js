const {Router} = require('express');
const {check} = require('express-validator');
const {register,login}=require('../controllers/user')
const {existsUserWithMail} = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');
const router = Router();


router.post('/login',login)
router.post('/register',[
    check('mail').custom(existsUserWithMail),
    validateFields
],register)


module.exports=router;