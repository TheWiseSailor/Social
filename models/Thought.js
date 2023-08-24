// Import required libraries
import mongoose from 'mongoose';
import { format } from 'date-fns'; // Import format function from date-fns

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
    get: timestamp => format(timestamp, 'yyyy-MM-dd HH:mm:ss'), // Format date using date-fns
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
    get: timestamp => format(timestamp, 'yyyy-MM-dd HH:mm:ss'), // Format date using date-fns
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