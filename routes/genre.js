const {Router} = require('express');
const { check } = require('express-validator');
const {getGenres,postGenre,putGenre} = require('../controllers/genres');
const { existsGenreWithName } = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');
const validateJwt = require('../middlewares/validate-jwt');
const router = Router();

router.get('/',[
    validateJwt
]
,getGenres);

router.post('/',[
    validateJwt,
    check('name','El género debe tener un nombre').not().isEmpty(),
    check('name').custom(existsGenreWithName),
    validateFields]
,postGenre);



router.put('/:id',[
    validateJwt,
    check('name').custom(existsGenreWithName),
    validateFields
],putGenre)

module.exports=router