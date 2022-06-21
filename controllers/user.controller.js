const { response, request } = require('express'); // No es necesario hacerlo pero sirve como objeto para obtener parametros, o tipado
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('./../models/user.js');

const userGet = (req = request, res = response) => {

    // -> ?q=hola&nombre=will&apikey=1234567890
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query; // -> ?

    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPost = async (req = request, res = response) => {

    const errors = validationResult(req);
    // Si hay errores -> lanzalos
    if (!errors.isEmpty()) return res.status(400).json(errors);


    const { nombre, correo, password, rol } = req.body; // Excluir solo google -> {google, ...data} -> data es lo mismo que la desestructuracion actual
    const user = new User({ nombre, correo, password, rol }); // Creamos la instancia en mongodb

    // Verificar si el correo existe
    const existeEmail = await User.findOne({ correo });
    if (existeEmail) return res.status(400).json({ msg: 'El correo ya se encuentra registrado' });


    // Encriptar contraseña -> hash
    const salt = bcryptjs.genSaltSync(10); // Valor para las vueltas que se le da a la encriptacion de la contraseña
    user.password = bcryptjs.hashSync(password, salt); // Listo se encripto

    // Guardar en DB
    await user.save(); // ! Falta manejar errores

    res.status(201).json({
        msg: 'post API - controller',
        user
    });

}

const userPut = (req = request, res = response) => {

    const { id } = req.params; // -> req.params.id

    res.status(400).json({
        msg: 'put API - controller',
        id
    });
}

const userDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

const userPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}



module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}