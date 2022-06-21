const { Router } = require('express');
const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/user.controller');

// Inicializacion
const router = Router();


// REST endpoints -> URL
router.get('/', userGet); // Mandamos la referencia, no la ejecucion ! ()

router.post('/', userPost);

router.put('/:id', userPut); // :id -> parametros de segmento

router.delete('/:id', userDelete);

router.patch('/', userPatch);



module.exports = router;