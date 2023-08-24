const Thought = require("../models/Thought");
const User = require("../models/User");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    const { id } = req.params;
    Thought.findOne({ _id: id })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    const { thoughtText, username } = req.body;
    Thought.create({ thoughtText, username })
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { username },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  updateThought(req, res) {
    const { id } = req.params;
    const { thoughtText } = req.body;
    Thought.findOneAndUpdate({ _id: id }, { thoughtText }, { new: true })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteThought(req, res) {
    const { id } = req.params;
    Thought.findOneAndDelete({ _id: id })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        // Remove thought's reactions
        return User.updateMany(
          { thoughts: id },
          { $pull: { thoughts: id } },
          { multi: true }
        );
      })
      .then(() =>
        res.json({ message: "Thought and associated reactions deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  removeReaction(req, res) {
    const { thoughtId, reactionId } = req.params;
    Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId } } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
