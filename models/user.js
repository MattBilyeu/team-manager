const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: false
    },
    primaryTask: {
        type: String,
        required: true
    },
    floatTask: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);