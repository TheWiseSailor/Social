# Social Network API

This is the Social Network API, welcome! For a social network online application where users may post their opinions, respond to friends' thoughts, and maintain their friend lists, this project offers an API.

## Table of Contents

- [Introduction](#social-network-api)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Models](#models)
  - [User Model](#user-model)
  - [Thought Model](#thought-model)
  - [Reaction Schema](#reaction-schema)
- [API Routes](#api-routes)
  - [Users](#users)
  - [Thoughts](#thoughts)
- [Usage](#usage)
- [Walkthrough Video](#walkthrough-video)
- [Deployment](#deployment)
- [Credits](#credits)
- [License](#license)

## Getting Started

### Installation

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.

### Environment Setup

1. Create a `.env` file in the root directory.
2. Set up your environment variables in the `.env` file. For example:
   ```env
   MONGODB_URI=mongodb://localhost:27017/Socialnetwork
   PORT=3001
   ```

## Models

### User Model

- username: String (Unique, Required, Trimmed)
- email: String (Required, Unique, Must match a valid email address)
- thoughts: Array of \_id values referencing the Thought model
- friends: Array of \_id values referencing the User model (self-reference)
- Virtual: friendCount to retrieve the length of the user's friends array

The User model represents a user in the social network. It includes fields for the user's username, email, thoughts they have posted, and their friends list.

### Thought Model

The Thought model represents a thought or post shared by a user in the social network. It includes fields for the thought's text content, creation timestamp, the username of the user who posted it, and an array of reactions.

### Reaction Schema

The Reaction schema is used to define the structure of individual reactions within a thought. Each reaction includes a unique reactionId, the reaction's body or content, the username of the user who created the reaction, and a creation timestamp.

## API Routes

### Users

- GET /api/users: Get all users
- GET /api/users/:id: Get a single user by id and populate thought and friend data
- POST /api/users: Create a new user
- PUT /api/users/:id: Update a user by id
- DELETE /api/users/:id: Delete a user by id
- POST /api/users/:userId/friends/:friendId: Add a new friend to a user's friend list
- DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list

### Thoughts

- GET /api/thoughts: Get all thoughts
- GET /api/thoughts/:id: Get a single thought by id
- POST /api/thoughts: Create a new thought
- PUT /api/thoughts/:id: Update a thought by id
- DELETE /api/thoughts/:id: Delete a thought by id
- POST /api/thoughts/:thoughtId/reactions: Create a reaction for a thought
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought

## Usage

1. Start the API server using `npm start`.
2. Use tools like Postman or Insomnia to send requests to the API routes.

## Walkthrough Video

[Untitled_ Aug 24, 2023 9_07 PM (2).webm](https://github.com/TheWiseSailor/Social-Network-Api/assets/68026214/bde18347-6575-43cf-b8dd-e83d7c23c5f4)


## Deployment

To deploy the Social Network API to Heroku (or other platforms), follow the deployment steps specific to the platform.

## Credits

https://developer.mozilla.org/en-US/ <br/>
https://stackoverflow.com/ <br/>
https://www.youtube.com/ <br/>
https://www.w3schools.com/ <br/>
https://mongoosejs.com/docs/ <br/>
Donna Thompson
