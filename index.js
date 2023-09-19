const fs = require("fs");
const http = require("http");
const express = require("express");
const hostname = "localhost";
const port = 5000;

const app = express();
//MIDDLEWARE
app.use(express.json());
/* HTTP METHOD (verbs)
POST -> 👉 CREATE [VD: /nations]
GET -> 👉 READ [VD: /nations]
PUT -> 👉 UPDATE (send entire object to update) [VD: /nations/1]
PATCH -> 👉 UPDATE (send only the part of the obj to update ) [VD: /nations/1]
DELETE -> 👉 DELETE (specific id or some other unique identifier to the resource to be deleted) [VD: /nations/1]
=> CRUD: CREATE | READ | UPDATE | DELETE
*If we have users 
GET -> /users/3/nations (all the nations of users number 3)
DELETE -> /users/3/nations/9 (delete nations number 9 from users number 3)
*/

//Convert to JS Obj (blocking|first time)
const nations = JSON.parse(fs.readFileSync(`${__dirname}/data/nations.json`));
const players = JSON.parse(fs.readFileSync(`${__dirname}/data/players.json`));

// NATIONS
const getAllNation = (req, res) => {
  // Jsend
  res.status(200).json({
    status: "success",
    results: nations.length,
    data: {
      nations: nations,
    },
  });
};
const getNationById = (req, res) => {
  console.log(req.params);
  // 1. Convert id to number
  const id = req.params.id * 1;
  // 2. Find in tours data
  const nation = nations.find((el) => el.id === id);
  // Err Handle
  if (!nation) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  // Success
  res.status(200).json({
    status: "success",
    data: {
      nations: nation,
    },
  });
};
const createNation = (req, res) => {
  //  1. CREATE NEW OBJECT
  //because we dont have db to automatically add newId
  const newId = nations[nations.length - 1].id + 1;
  //newTour(body.req) | Object.assign(to create a new object by merging two existing objects)
  const newNation = Object.assign({ id: newId }, req.body);
  // 2. PUT THE NEW OBJECT IN TO ARRAY OBJECT
  nations.push(newNation);
  // 3. WRITE IT TO FILE (non-blocking)
  fs.writeFile(
    `${__dirname}/data/nations.json`,
    JSON.stringify(nations),
    (err) => {
      //201 - created
      res.status(201).json({
        status: "success",
        data: {
          nations: newNation,
        },
      });
    }
  );
};
const updateNationPatch = (req, res) => {
  // Find id
  const id = req.params.id * 1;
  const nationToUpdate = nations.find((el) => el.id === id);
  // Err handle
  if (!nationToUpdate) {
    res.status(404).json({
      status: "fail",
      message: "No tour object with" + id + "is not found",
    });
  }
  // Find index correspond with nation's id in data
  const nationIndex = nations.indexOf(nationToUpdate);
  // Update the nation object directly
  Object.assign(nationToUpdate, req.body);
  // Update the array with the modified object
  nations[nationIndex] = nationToUpdate;
  fs.writeFile(
    `${__dirname}/data/nations.json`,
    JSON.stringify(nations),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          nations: nationToUpdate,
        },
      });
    }
  );
};
const updateNationPut = (req, res) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /nations");
};
const deleteAllNations = (req, res) => {
  // Clear the nations array
  nations.length = 0;
  // Update the JSON file with an empty array
  fs.writeFile(
    `${__dirname}/data/nations.json`,
    JSON.stringify(nations),
    (err) => {
      if (err) {
        // Handle any errors that may occur during file write
        res.status(500).json({
          status: "error",
          message: "Failed to delete all nations",
        });
      } else {
        // Success response
        res.status(203).json({
          status: "success",
          data: {
            message: "All nations deleted successfully",
          },
        });
      }
    }
  );
};
const deleteNationById = (req, res) => {
  try {
    // Check if nations is defined and initialize it if necessary
    if (!Array.isArray(nations)) {
      nations = [];
    }

    const id = req.params.id * 1;
    const nationToDelete = nations.find((el) => el.id === id);

    if (!nationToDelete) {
      return res.status(404).json({
        status: "fail",
        message: "No nation with ID " + id + " is found to delete",
      });
    }

    const index = nations.indexOf(nationToDelete);

    nations.splice(index, 1);

    fs.writeFile(
      `${__dirname}/data/nations.json`,
      JSON.stringify(nations),
      (err) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Failed to delete the nation",
          });
        }

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
// PLAYER
const getAllPlayer = (req, res) => {
  res.status(200).json({
    status: "success",
    result: players.length,
    data: {
      players: players,
    },
  });
};
const getPlayerById = (req, res) => {
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
const createPlayer = (req, res) => {
  //  1. CREATE NEW OBJECT
  //because we dont have db to automatically add newId
  const newId = players[players.length - 1].id + 1;
  //newTour(body.req) | Object.assign(to create a new object by merging two existing objects)
  const newPlayer = Object.assign({ id: newId }, req.body);
  // 2. PUT THE NEW OBJECT IN TO ARRAY OBJECT
  players.push(newPlayer);
  // 3. WRITE IT TO FILE (non-blocking)
  fs.writeFile(
    `${__dirname}/data/players.json`,
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
const updatePlayerPatch = (req, res) => {
  // Find id
  const id = req.params.id * 1;
  const playerToUpdate = players.find((el) => el.id === id);
  // Err handle
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
    `${__dirname}/data/players.json`,
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
const updatePlayerPut = (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /players");
};
const deleteAllPlayers = (req, res) => {
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
const deletePlayerById = (req, res) => {
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
      `${__dirname}/data/players.json`,
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
//____________________________GET_________________________________
// READ NATIONS
app.get("/nations", getAllNation);
// READ PLAYERS
app.get("/players", getAllPlayer);
//READ NATIONS WITH ID(var)
app.get("/nations/:id", getNationById);
//READ PLAYERS WITH ID(var)
app.get("/players/:id", getPlayerById);

//_____________________________POST________________________________________
// CREATE NATIONS
app.post("/nations", createNation);
// CREATE PLAYERS
app.post("/players", createPlayer);
//_____________________________PATCH________________________________________
// UPDATE NATION PATCH
app.patch("/nations/:id", updateNationPatch);
// UPDATE PLAYER PATCH
app.patch("/players/:id", updatePlayerPatch);

//_____________________________PUT________________________________________
// UPDATE NATION PUT
app.put("/nations", updateNationPut);
// UPDATE PLAYER PUT
app.put("/players", updatePlayerPut);
//_____________________________DELETE________________________________________
// DELETE ALL NATIONS
app.delete("/nations", deleteAllNations);
// DELETE NATION BY ID
app.delete("/nations/:id", deleteNationById);
// DELETE PLAYER BY ID
app.delete("/players/:id", deletePlayerById);
// DELETE ALL PLAYERS
app.delete("/players", deleteAllPlayers);

// 1. Create server
const server = http.createServer(app);
// 2. Start server
server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
