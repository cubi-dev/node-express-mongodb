const Player = require('./../models/playersModel'); 

// middleware checkID in req.body
exports.checkBodyId = (req, res, next) => {
  const body = req.body
  if ("id" in body) {
    return res.status(404).json({
      status: "fail",
      message: "No update with id",
    });
  }
  next();
}
// PLAYER
exports.getAllPlayer = async (req, res) => {
  try {
    const players = await Player.find(); 
    // Success
  res.status(200).json({
    status: "success",
    results: players.length,
    data: {
      players: players,
    },
  });
  } catch (error) {
    res.status.json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getPlayerWithId = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id) //Player.findOne({ _id: req.params.id })
    res.status(200).json({
      status: 'success',
      data: {
        players: player,
      },
    });
  } catch (error) {
    res.status.json({
      status: 'fail',
      message: error,
    });
  }
}


exports.createPlayer = async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);
    //201 - created
    res.status(201).json({
      status: "success",
      data: {
        players: newPlayer,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.updatePlayerPatch = async (req, res) => {
  try {
    const playerToUpdate = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, //Cái này để validator(vd nếu như price thì k thể để String đc )
    })
    res.status(200).json({
      status: "success",
      data: {
        players: playerToUpdate,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.updatePlayerPut = (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /players");
};
// exports.deleteAllPlayers = (req, res) => {
//   // Clear the players array
//   players.length = 0;
//   // Update the JSON file with an empty array
//   fs.writeFile("./data/players.json", JSON.stringify(players), (err) => {
//     if (err) {
//       // Handle any errors that may occur during file write
//       return res.status(500).json({
//         status: "error",
//         message: "Failed to delete all players",
//       });
//     } else {
//       // Success response
//       return res.status(203).json({
//         status: "success",
//         data: {
//           message: "All players deleted successfully",
//         },
//       });
//     }
//   });
// };
exports.deletePlayerById = async (req, res) => {
  // Err Handle
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.status(204).json({
      //204-no-content
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status.json({
      status: 'fail',
      message: error,
    });
  }
};
