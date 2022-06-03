const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'] 
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'] 
    },
    state: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...achievement } = this.toObject();
    achievement.uid = _id;
    return achievement;
}

module.exports = model('Achievement', UserSchema);