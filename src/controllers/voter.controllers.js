const Voter = require('../models/voter.model.js');
const Candidate = require('../models/candidate.model.js');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  Voter.find()
    .then(voters => {
      res.send(voters);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while getting list of users."
      });
    });
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }

  // Create a new User
  const voter = new Voter({
    v_id: req.body.id,
    full_name: req.body.first_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    status: false
  });

  // Save user in the database
  voter.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new voter."
      });
    });
};

// Find a single User with a id
exports.findOne = (req, res) => {
  Voter.findById(req.params.id)
    .then(voter => {
      if (!voter) {
        return res.status(404).send({
          message: "Voter not found with id " + req.params.id
        });
      }
      res.send(voter);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Voter not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error getting user with id " + req.params.id
      });
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }

  // Find user and update it with the request body
  Voter.findByIdAndUpdate(req.params.id, {
    v_id: req.body.v_id,
    full_name: req.body.first_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    status: false
  }, { new: true })
    .then(voter => {
      if (!voter) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      res.send(voter);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  Voter.findByIdAndRemove(req.params.id)
    .then(voter => {
      if (!voter) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      res.send({ message: "user deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id
      });
    });
};


exports.vote = async (req, res) => {
  try {
    const candidate_id = req.body.c_id
    const voter_id = req.body.v_id
    const candidate = await Candidate.findById(candidate_id)
    const voter = await Voter.findById(voter_id)

    if (voter) {
      if(voter.status) {
        return res.status(400).send({
          message: "Voter already voted"
        })
      }
    } else {
      return res.status(404).send({
        message: "Voter is not found"
      })
    }


    if(candidate == null) {
      return res.status(404).send({
        message: "Candidate is not found"
      })
    }

    const updatedVoter = await Voter.findByIdAndUpdate(voter_id, {
      $set: {
        "status": true
      }
    })

    if(updatedVoter == null) {
      return res.status(404).send({
        message: "Voter is not found"
      })
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(candidate_id, {
      $set: {
        vote_count: candidate.vote_count + 1
      }
    })

    if(updatedCandidate == null) {
      return res.status(404).send({
        message: "Candidate is not found"
      })
    }

    return res.status(200).send({
      message: "successfully voted"
    });
  }
  catch(error) {
    return res.status(400).send({
      message: "Error" + error
    });
  }
}
