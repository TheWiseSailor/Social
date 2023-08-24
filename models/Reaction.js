// Mongoose ObjectId data type
// String, required, max length 280
// String, required
// Date, default value current timestamp, getter method to format timestamp
// Import the mongoose library
const mongoose = require('mongoose');

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Create a new Schema for the 'Reaction' model
const reactionSchema = new Schema({
  // Define a unique identifier for reactions
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId() // Generate a new ObjectId by default
  },
  // Define the content of the reaction
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280 // Limit the reaction length
  },
  // Define the username associated with the reaction
  username: {
    type: String,
    required: true
  },
  // Define the creation timestamp of the reaction
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString() // Convert timestamp to ISO string
  }
});

// Create a new Schema for the 'Thought' model
const thoughtSchema = new Schema({
  // Define the content of the thought
  thoughtText: {
    type: String,
    required: true,
    minlength: 1, // Ensure a minimum length for thoughts
    maxlength: 280 // Limit the thought length
  },
  // Define the creation timestamp of the thought
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString() // Convert timestamp to ISO string
  },
  // Define the username associated with the thought
  username: {
    type: String,
    required: true
  },
  // Define an array to store reactions associated with the thought
  reactions: [reactionSchema] // Embed 'reactionSchema' within 'thoughtSchema'
});

// Create a virtual property 'reactionCount' for the 'Thought' model
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length; // Calculate and return the count of reactions
});

// Create the 'Thought' model using the defined schema
const Thought = mongoose.model('Thought', thoughtSchema);

// Export the 'Thought' model for external use
module.exports = Thought;