const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    titulo: {
        type: String,
        required: [true, 'El nombre es obligatorio'] 
    },
    id_categoria: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'La categoria es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es requerida']
    },
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...user } = this.toObject();
    service.uid = _id;
    return service;
}
