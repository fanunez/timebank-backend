const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'] 
    },
    request: {
        type: Number,
        required: [true, 'La solicitud es obligatoria']
    },
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
}

module.exports = model('category', UserSchema);