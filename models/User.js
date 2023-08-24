// Import the mongoose library
const mongoose = require('mongoose');

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Create a new Schema for the 'User' model
const userSchema = new Schema({
  // Define the 'username' field
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true // Remove extra whitespace
  },
  // Define the 'email' field
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email'] // Validate email format
  },
  // Define the 'thoughts' field as an array of ObjectIds referencing 'Thought' model
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought' // Referencing 'Thought' model
    }
  ],
  // Define the 'friends' field as an array of ObjectIds referencing 'User' model
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User' // Referencing 'User' model for friendship connections
    }
  ]
});

// Create a virtual property 'friendCount' for the 'User' model
userSchema.virtual('friendCount').get(function() {
  return this.friends.length; // Calculate and return the count of friends
});

// Create the 'User' model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the 'User' model for external use
module.exports = User;