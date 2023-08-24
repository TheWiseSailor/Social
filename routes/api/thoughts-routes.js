const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');

router.get('/thoughts', thoughtController.getAllThoughts);
router.get('/thoughts/:id', thoughtController.getSingleThought);
router.post('/thoughts', thoughtController.createThought);
router.put('/thoughts/:id', thoughtController.updateThought);
router.delete('/thoughts/:id', thoughtController.deleteThought);
router.post('/thoughts/:thoughtId/reactions', thoughtController.addReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

module.exports = router;