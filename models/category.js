const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'] 
    },
    petition: {
        type: Number,
        required: [true, 'La solicitud es obligatoria']
    },
    img: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
}

module.exports = model('Category', UserSchema);