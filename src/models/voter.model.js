const mongoose = require('mongoose');

const VoterSchema = mongoose.Schema({
    full_name: String,
    email: String,
    password: String,
    phone: String,
    status: Boolean
},{
    timestamps: true
});

module.exports = mongoose.model('Voter', VoterSchema);
