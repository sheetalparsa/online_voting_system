const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    c_id: String,
    username: String,
    password: String,
    contact_number: Number,
    designation: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Candidate', CandidateSchema);
