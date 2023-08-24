const router = require('express').Router();
const userController = require('../../controllers/user-controller');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getSingleUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users/:userId/friends/:friendId', userController.addFriend);
router.delete('/users/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;