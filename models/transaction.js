const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    id_user_aplicant: {
        type: Schema.Types.ObjectId,
        ref: 'community_user',
        required: [true, 'El id usuario aplicante es obligatorio']
    },
    id_user_owner: {
        type: Schema.Types.ObjectId,
        ref: 'community_user',
        required: [true, 'El id usuario dueño es obligatorio']
    },
    id_service: {
        type: Schema.Types.ObjectId,
        ref: 'service',
        required: [true, 'El id del servicio es obligatorio']
    },
    date:{
        type: Date,
        required: [true, 'La fecha de transaccion es obligatoria']
    },
    state_request:{
        type: Number,
        required: [true, 'El estado de transaccion es obligatoria']
    },
    state: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...transaction } = this.toObject();
    transaction.uid = _id;
    return transaction;
}

module.exports = model('Transaction', UserSchema);