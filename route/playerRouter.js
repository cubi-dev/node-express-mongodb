const express = require("express");
const bodyParser = require("body-parser");
const playerController = require("./../controllers/playerController");
// ROUTE FOR PLAYER
const playerRouter = express.Router();
// MIDDLEWARE
playerRouter.use(bodyParser.json());
// Check id param (withId function)
// playerRouter.param('id', playerController.checkID);

// ROUTE
playerRouter
  .route("/")
  .get(playerController.getAllPlayer)
  .post(playerController.createPlayer)
  .put(playerController.updatePlayerPut);

playerRouter
  .route("/:id")
  .get(playerController.getPlayerWithId)
  // must check body id not allowed
  .patch(playerController.checkBodyId, playerController.updatePlayerPatch)
  .delete(playerController.deletePlayerById);

module.exports = playerRouter;
