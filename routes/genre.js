const {Router} = require('express');
const { check } = require('express-validator');
const {getGenre,postGenre,postGenreSql,putGenre, getGenreSql} = require('../controllers/genres');
const { existsGenreWithName } = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');
const router = Router();

//router.get('/',getGenre);

/*router.post('/',[
    check('name').custom(existsGenreWithName),
    validateFields]
,postGenre);*/

router.get('/',getGenreSql)

router.post('/',[
    check('name').custom(existsGenreWithName),
    validateFields
],postGenreSql);

router.put('/:id',[
    check('name').custom(existsGenreWithName),
    validateFields
],putGenre)

module.exports=router