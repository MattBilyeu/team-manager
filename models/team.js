const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    updates: {
        type: [{
            category: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            acknowledged: [{
                type: Schema.Types.ObjectId,
                ref: 'TMuser',
                required: false
            }]
        }]
    },
    tips: {
        type: Array,
        required: true
    },
    escalations: {
        type: [{
            title: {
                type: String,
                required: true
            },
            notes: [{
                type: String,
                required: true
            }],
            stage: {
                type: String,
                required: true
            },
            owner: {
                type: Schema.Types.ObjectId,
                ref: 'TMuser',
                required: true
            }
        }]
    },
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'TMuser',
            required: false
        }],
        required: true
    }
});

module.exports = mongoose.model('Team', teamSchema);