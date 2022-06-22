const { response, request } = require('express'); // No es necesario hacerlo pero sirve como objeto para obtener parametros, o tipado
const bcryptjs = require('bcryptjs');

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

    const { nombre, correo, password, rol } = req.body; // Excluir solo google -> {google, ...data} -> data es lo mismo que la desestructuracion actual
    const user = new User({ nombre, correo, password, rol }); // Creamos la instancia en mongodb

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

const userPut = async (req = request, res = response) => {

    const { id } = req.params; // -> req.params.id
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: validar contra la base de datos
    if (password) {
        // Encriptar contraseña -> hash
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto); // Buscalo por el id y actualizalos -> retorna los datos actualizados del objeto

    res.status(400).json({
        msg: 'put API - controller',
        user
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