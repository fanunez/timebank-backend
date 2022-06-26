const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'El id usuario de la notificacion es obligatoria']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'] 
    },
    date:{
        type: Date,
        required: [true, 'La fecha de transaccion es obligatoria']
    },
    check:{
        type: Number,
        default: 0 
    },
    state: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...notification } = this.toObject();
    notification.uid = _id;
    return notification;
}

module.exports = model('Notification', UserSchema);