const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const playerController = require('./../controllers/playerController')
// ROUTE FOR PLAYER
const playerRouter = express.Router(); 
// MIDDLEWARE
playerRouter.use(bodyParser.json());

playerRouter
.route('/')
.get(playerController.getAllPlayer)
.post(playerController.createPlayer)
.put(playerController.updatePlayerPut)
.delete(playerController.deleteAllPlayers);

playerRouter
.route('/:id')
.get(playerController.getPlayerById)
.patch(playerController.updatePlayerPatch)
.delete(playerController.deletePlayerById)

module.exports = playerRouter;