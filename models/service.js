const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'] 
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
    valor: {
        type: Number,
        required: [true, 'El valor es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es requerida']
    },
    id_usuario_creador: {
        type: Schema.Types.ObjectId,
        ref: 'community_user',
        required: [true, 'El usuario creador es obligatorio']
    },
    logros: {
        type: Array
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...service } = this.toObject();
    service.uid = _id;
    return service;
}

module.exports = model('service', UserSchema);