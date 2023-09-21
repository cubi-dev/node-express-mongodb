const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const nationController = require('./../controllers/nationController')
// ROUTE FOR NATION
const nationRouter = express.Router(); 
// MIDDLEWARE
nationRouter.use(bodyParser.json());
// ROUTE
nationRouter
.route('/')
.get(nationController.getAllNation)
.post(nationController.createNation)
.put(nationController.updateNationPut)
.delete(nationController.deleteAllNations);

nationRouter
.route('/:id')
.get(nationController.getNationById)
.patch(nationController.updateNationPatch)
.delete(nationController.deleteNationById)

module.exports = nationRouter;