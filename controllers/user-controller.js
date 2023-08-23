// Import necessary models
// Define controller methods for CRUD operations on users
// Retrieve all users from the database
// Retrieve a single user by their _id, populate their thoughts and friends
// Create a new user
// Update a user by their _id
// Delete a user by their _id and also delete their associated thoughts
// Add a friend to a user's friend list
// Remove a friend from a user's friend list
// Importing the User and Thought models for database operations
const User = require("../models/User");
const Thought = require("../models/Thought");

// Controller object to handle user-related operations
const userController = {
  // Get all users with their thoughts and friends
  getAllUsers(req, res) {
    User.find({})
      .populate("thoughts") // Populate user's thoughts
      .populate("friends") // Populate user's friends
      .then((userData) => res.json(userData)) // Send JSON response with user data
      .catch((err) => res.status(500).json(err)); // Handle errors with a 500 status code
  },

  // Get a single user by ID with their thoughts and friends
  getSingleUser(req, res) {
    const { id } = req.params;
    User.findOne({ _id: id })
      .populate("thoughts") // Populate user's thoughts
      .populate("friends") // Populate user's friends
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found" }); // Respond with a 404 if user doesn't exist
          return;
        }
        res.json(userData); // Send JSON response with user data
      })
      .catch((err) => res.status(500).json(err)); // Handle errors with a 500 status code
  },

  // Create a new user
  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((userData) => res.json(userData)) // Send JSON response with created user data
      .catch((err) => res.status(400).json(err)); // Handle errors with a 400 status code
  },
  // Create a new user
  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((userData) => res.json(userData)) // Send JSON response with created user data
      .catch((err) => res.status(400).json(err)); // Handle errors with a 400 status code
  },

  // Update user's information
  updateUser(req, res) {
    const { id } = req.params;
    const { username, email } = req.body;
    User.findOneAndUpdate({ _id: id }, { username, email }, { new: true }) // Find and update user, returning updated data
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found" }); // Respond with a 404 if user doesn't exist
          return;
        }
        res.json(userData); // Send JSON response with updated user data
      })
      .catch((err) => res.status(400).json(err)); // Handle errors with a 400 status code
  },

  // Delete a user and their associated thoughts
  deleteUser(req, res) {
    const { id } = req.params;
    User.findOneAndDelete({ _id: id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found" }); // Respond with a 404 if user doesn't exist
          return;
        }
        // Remove user's thoughts
        return Thought.deleteMany({ username: userData.username }); // Delete associated thoughts
      })
      .then(() => res.json({ message: "User and associated thoughts deleted" })) // Send success message
      .catch((err) => res.status(500).json(err)); // Handle errors with a 500 status code
  },

  // Add a friend to the user's friend list
  addFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // Add friend to the set of friends
      { new: true } // Return updated user data
    )
      .populate("friends") // Populate user's friends
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found" }); // Respond with a 404 if user doesn't exist
          return;
        }
        res.json(userData); // Send JSON response with updated user data
      })
      .catch((err) => res.status(400).json(err)); // Handle errors with a 400 status code
  },

  // Remove a friend from the user's friend list
  removeFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } }, // Remove friend from the set of friends
      { new: true } // Return updated user data
    )
      .populate("friends") // Populate user's friends
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "User not found" }); // Respond with a 404 if user doesn't exist
          return;
        }
        res.json(userData); // Send JSON response with updated user data
      })
      .catch((err) => res.status(400).json(err)); // Handle errors with a 400 status code
  },
};
module.exports = userController;
