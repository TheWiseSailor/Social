// String, required, max length 280
// Date, default value current timestamp, getter method to format timestamp
// String, required
// Use the Reaction subdocument schema
// Define a virtual for reactionCount
// Import required libraries
import mongoose from 'mongoose';
import dateFormat from 'your-date-format-library'; // Replace with actual date format library

// Destructure Schema from mongoose
const { Schema } = mongoose;

// Define Reaction subdocument schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
    unique: true, // Ensure unique reaction bodies
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp),
  },
});

// Define main Thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 10, // Increased minimum length for uniqueness
    maxlength: 420, // Embracing the internet culture
    unique: true, // Ensure unique thought texts
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from usernames
  },
  reactions: [reactionSchema], // Include reaction schema
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
  }],
});

// Define virtual property for friendCount
thoughtSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Compile the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

// Export the model
export default Thought;