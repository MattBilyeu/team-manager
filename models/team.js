const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    updates: {
        type: Array,
        required: true
    },
    tips: {
        type: Array,
        required: true
    },
    escalations: {
        type: Array,
        required: true
    },
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }],
        required: true
    }
});

module.exports = mongoose.model('Team', teamSchema);