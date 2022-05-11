const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] 
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    edad: {
        type: Number,
        required: [true, 'La edad es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    tipoUsuario: {
        type: String,
        required: [true, 'El tipo de usuario es obligatorio']
    },
    state: {
        type: Boolean,
        default: true
    }

})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}



module.exports = model( 'community_user', UserSchema );