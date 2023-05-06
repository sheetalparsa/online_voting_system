const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    full_name: String,
    email: String,
    phone: String,
    position: String,
    election_symbol: String,
    password: String,
    vote_count: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Candidate', CandidateSchema);
