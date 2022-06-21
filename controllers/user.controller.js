const { response, request } = require('express'); // No es necesario hacerlo pero sirve como objeto para obtener parametros, o tipado


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
};

const userPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        edad
    });

};

const userPut = (req = request, res = response) => {

    const { id } = req.params; // -> req.params.id

    res.status(400).json({
        msg: 'put API - controller',
        id
    });
};

const userDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
};

const userPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
};



module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}