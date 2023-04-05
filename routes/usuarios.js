const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPath } = require('../controllers/usuarios');
    
const router = Router()

router.get('/', usuariosGet); 

router.put('/:id',[
       check('id','No es un id valido').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       check('rol').custom(esRolValido),
       validarCampos 
], usuariosPut); 

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({min:6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExiste),
        //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE'],['USER_ROLE']),
        check('rol').custom(esRolValido),
        //el custom esta optimizado, es lo mismo que ((rol) => esRolValido(rol))
        validarCampos
],usuariosPost);

router.delete('/', usuariosDelete); 

router.patch('/', usuariosPath); 

module.exports = router;