const mongoose = require('mongoose');

const VoterSchema = mongoose.Schema({
    v_id: String,
    username: String,
    password: String,
    contact_number: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Voter', VoterSchema);
