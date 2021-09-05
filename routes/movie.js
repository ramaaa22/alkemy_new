const {Router} = require('express');
const {postMovie, getMovies,getMovie,postMovieSql, getMoviesSql,getMovieSql} = require('../controllers/movies')
const validateFields = require('../middlewares/validate-fields')
const {existsMovieWithName} = require('../helpers/db-validator');
const {check} = require('express-validator');
const router = Router();

/*router.post('/',postMovie);

router.get('/:id',getMovie)

router.get('/',getMovies)*/

router.get('/',getMoviesSql)

router.get('/:id',getMovieSql)

router.post('/',[
    check('name').custom(existsMovieWithName),
    validateFields
],postMovieSql);


module.exports=router;