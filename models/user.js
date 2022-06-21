const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] // Si es requerido: true, caso no enviado
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROL', 'USER_ROL'] // Se valida que el rol es uno u otro
    },
    estado: {
        type: Boolean,
        default: true // Por defecto se marca como true
    },
    google: { // Autenticacion con google sigin
        type: Boolean,
        default: false
    }
});






module.exports = model('User', UserSchema)
// Moongose le agregara una s a nuestro modelo -> user :: users