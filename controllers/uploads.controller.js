const { response, request } = require("express");

const { subirArchivo } = require('./../helpers');

const { User, Producto } = require('./../models');

// express-fileupload -> para subir archivos
const cargarArchivos = async (req = request, res = response) => {

    // Esta validacion ahora es un middleware -> funciona en routes
    // if (!req.files || !req.files.archivo || Object.keys(req.files).length === 0) return res.status(400).json({ msg: 'No hay archivos que subir' });

    try {

        // txt, md
        // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        // Imagenes
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });

    } catch (error) {
        res.status(400).json({ msg: error });
    }

}

const actualizarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await User.findById(id)
            if (!modelo) return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre; // Path en donde se encuentra la imagen

    await modelo.save();

    res.json({ modelo });

}


module.exports = {
    cargarArchivos,
    actualizarImagen
}