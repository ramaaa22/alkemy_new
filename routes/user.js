const {Router} =require('express')
const {getUser,postUser,deleteUser,patchUser}= require('../controllers/users')


const router = Router();

router.get('/', getUser);

router.post('/:id', postUser)

router.delete('/',deleteUser)

router.patch('/',patchUser)

module.exports = router;