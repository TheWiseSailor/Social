// Import necessary models
// Define controller methods for CRUD operations on thoughts
// Retrieve all thoughts from the database
// Retrieve a single thought by its _id
// Create a new thought and update the associated user's thoughts array
// Update a thought by its _id
// Delete a thought by its _id and also remove its reference from the user's thoughts array
// Create a new reaction and push it to a thought's reactions array
// Delete a reaction from a thought's reactions array
// Importing User and Thought models for database operations
const User = require("../models/User");
const Thought = require("../models/Thought");
// Controller object to handle user-related operations
const userController = {
  // Get all users with their thoughts and friends
  getAllUsers(req, res) {
    User.find({})
      .populate("thoughts") // Populate user's thoughts
      .populate("friends") // Populate user's friends
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user by ID with their thoughts and friends
  getSingleUser(req, res) {
    const { id } = req.params;
    User.findOne({ _id: id })
      .populate("thoughts") // Populate user's thoughts
      .populate("friends") // Populate user's friends
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Create a new user
  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
};
