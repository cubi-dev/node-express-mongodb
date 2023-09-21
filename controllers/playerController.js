const fs = require("fs");
//Convert to JS Obj (blocking|first time)
const players = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/players.json`)
);

// PLAYER
exports.getAllPlayer = (req, res) => {
  res.status(200).json({
    status: "success",
    result: players.length,
    data: {
      players: players,
    },
  });
};
exports.getPlayerById = (req, res) => {
  console.log(req.params);
  // 1. Convert id to number
  const id = req.params.id * 1;
  // 2. Find in tours data
  const player = players.find((el) => el.id === id);
  // Err Handle
  if (!player) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  // Success
  res.status(200).json({
    status: "success",
    data: {
      players: player,
    },
  });
};
exports.createPlayer = (req, res) => {
  //  1. CREATE NEW OBJECT
  //because we dont have db to automatically add newId
  const newId = players[players.length - 1].id + 1;
  //newTour(body.req) | Object.assign(to create a new object by merging two existing objects)
  const newPlayer = Object.assign({ id: newId }, req.body);
  // 2. PUT THE NEW OBJECT IN TO ARRAY OBJECT
  players.push(newPlayer);
  // 3. WRITE IT TO FILE (non-blocking)
  fs.writeFile(
    `${__dirname}/../data/players.json`,
    JSON.stringify(players),
    (err) => {
      //201 - created
      res.status(201).json({
        status: "success",
        data: {
          players: newPlayer,
        },
      });
    }
  );
};
exports.updatePlayerPatch = (req, res) => {
  const body = req.body
  // Find id
  const id = req.params.id * 1;
  const playerToUpdate = players.find((el) => el.id === id);
  // Err handle
  if ("id" in body) {
    res.status(500).json({
      status: "fail",
      message: "No update with id",
    });
    return;
  }
  if (!playerToUpdate) {
    res.status(404).json({
      status: "fail",
      message: "No tour object with" + id + "is not found",
    });
  }
  // Find index correspond with nation's id in data
  const nationIndex = players.indexOf(playerToUpdate);
  // Update the nation object directly
  Object.assign(playerToUpdate, req.body);
  // Update the array with the modified object
  players[nationIndex] = playerToUpdate;
  fs.writeFile(
    `${__dirname}/../data/players.json`,
    JSON.stringify(players),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          players: playerToUpdate,
        },
      });
    }
  );
};
exports.updatePlayerPut = (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /players");
};
exports.deleteAllPlayers = (req, res) => {
  // Clear the players array
  players.length = 0;
  // Update the JSON file with an empty array
  fs.writeFile("./data/players.json", JSON.stringify(players), (err) => {
    if (err) {
      // Handle any errors that may occur during file write
      return res.status(500).json({
        status: "error",
        message: "Failed to delete all players",
      });
    } else {
      // Success response
      return res.status(203).json({
        status: "success",
        data: {
          message: "All players deleted successfully",
        },
      });
    }
  });
};
exports.deletePlayerById = (req, res) => {
  try {
    const id = req.params.id * 1;
    const playerToDelete = players.find((el) => el.id === id);

    if (!playerToDelete) {
      return res.status(404).json({
        status: "fail",
        message: "No player object with id " + id + " is not found to delete",
      });
    }
    const index = players.indexOf(playerToDelete);

    players.splice(index, 1);

    fs.writeFile(
      `${__dirname}/../data/players.json`,
      JSON.stringify(players),
      (err) => {
        return res.status(203).json({
          status: "success",
          data: {
            message: "delete success " + id,
          },
        });
      }
    );
  } catch (error) {
    console.error(error); // Log any unexpected errors
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};
