const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'] 
    },
    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    relation: {
        type: String,
        required: [true, 'La relacion es obligatoria']
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatorio']
    },
    address: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    phone: {
        type: String,
        required: [true, 'El telefono es obligatorio']
    },
    rut: {
        type: String,
        required: [true, 'El rut es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    type_user: {
        type: String,
        required: [true, 'El tipo de usuario es obligatorio']
    },
    balance: {
        type: Number,
        default: 0
    },
    img: {
        type: String
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

module.exports = model( 'User', UserSchema );