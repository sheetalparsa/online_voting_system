const Candidate = require("../models/candidate.model.js");

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  Candidate.find()
    .then((candidates) => {
      res.send(candidates);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of users.",
      });
    });
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }

  // Create a new User
  const candidate = new Candidate({
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    position: req.body.position,
    election_symbol: req.body.election_symbol,
    vote_count: 0
  });

  // Save user in the database
  candidate
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new user.",
      });
    });
};

// Find a single User with a id
exports.findOne = (req, res) => {
  Candidate.findById(req.params.id)
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(candidate);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error getting user with id " + req.params.id,
      });
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }

  // Find user and update it with the request body
  Candidate.findByIdAndUpdate(
    req.params.id,
    {
      full_name: req.body.full_name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      position: req.body.position,
      election_symbol: req.body.election_symbol,
    },
    { new: true }
  )
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }
      res.send(candidate);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  Candidate.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }
      res.send({ message: "user deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id,
      });
    });
};
