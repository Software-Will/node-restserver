const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/user.controller');

// Inicializacion
const router = Router();


// REST endpoints -> URL
router.get('/', userGet); // Mandamos la referencia, no la ejecucion ! ()

// check -> registra errores para mostrarlo en el controller
router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
], userPost); // 2do argumento -> middleware, 3er argumento -> controlador

router.put('/:id', userPut); // :id -> parametros de segmento

router.delete('/:id', userDelete);

router.patch('/', userPatch);



module.exports = router;