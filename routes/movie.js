const {Router} = require('express');
const {postMovie, getMovies,getMovie,putMovie,deleteMovie} = require('../controllers/movies')
const validateFields = require('../middlewares/validate-fields')
const validateJwt = require('../middlewares/validate-jwt')
const {existsMovieWithName} = require('../helpers/db-validator');
const {check} = require('express-validator');
const router = Router();

router.post('/',[
    validateJwt,
    check('name').custom(existsMovieWithName)],
    check('calification','Ingrese un numero del 1 al 5').isInt({ min: 1, max: 5 }),
    validateFields
,postMovie);

router.get('/:id',[
    validateJwt
],getMovie)

router.get('/',[
    validateJwt
],getMovies)

router.put('/:id',[
    validateJwt,
    check('name').custom(existsMovieWithName)],
    validateFields    
,putMovie)

router.delete('/:id',[
    validateJwt
],deleteMovie)




module.exports=router;