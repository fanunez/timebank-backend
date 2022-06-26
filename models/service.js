const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    title: {
        type: String,
        required: [true, 'El titulo es obligatorio'] 
    },
    id_category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'La categoria es obligatoria']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    value: {
        type: Number,
        required: [true, 'El valor es obligatorio']
    },
    img: {
        type: String,
    },
    id_owner: {
        type: Schema.Types.ObjectId,
        ref: 'community_user',
        required: [true, 'El usuario creador es obligatorio']
    },
    achievements: {
        type: [Schema.Types.ObjectId]
    },
    request_counter: {
        type: Number,
        default: 0
    },
    date:{
        type: Date,
        required: [true, 'La fecha de creación del servicio es obligatoria']
    },
    state: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...service } = this.toObject();
    service.uid = _id;
    return service;
}

module.exports = model('Service', UserSchema);