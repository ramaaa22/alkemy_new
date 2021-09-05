const {Router} =require('express');
const { check } = require('express-validator');
const {getCharacters,
    getCharacterById,
    postCharacter,
    deleteCharacter,
    patchCharacter,
    updateCharacter}= require('../controllers/characters');
const { existsCharacterWithName, existsCharacterWithId } = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');


const router = Router();

router.get('/', getCharacters);

router.get('/:id',[
    check('id','No es un id válido de Mongo').isMongoId(),
    check('id').custom(existsCharacterWithId),
    validateFields
],
    getCharacterById);


router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('image','La imagen es obligatorio').not().isEmpty(),
    check('age','La edad es obligatorio').not().isEmpty(),
    check('weight','El peso es obligatorio').not().isEmpty(),
    check('name').custom(existsCharacterWithName),
    validateFields
    ]  
    ,postCharacter,)

router.delete('/',deleteCharacter)

router.patch('/',patchCharacter)

router.put('/:id',[
    check('name').custom(existsCharacterWithName),
    validateFields
],updateCharacter)

module.exports = router;