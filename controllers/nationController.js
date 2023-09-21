const fs = require("fs");
//Convert to JS Obj (blocking|first time)
const nations = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/nations.json`)
);

// NATIONS
exports.getAllNation = (req, res) => {
  // Jsend
  res.status(200).json({
    status: "success",
    results: nations.length,
    data: {
      nations: nations,
    },
  });
};
exports.getNationById = (req, res) => {
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
exports.createNation = (req, res) => {
  //  1. CREATE NEW OBJECT
  //because we dont have db to automatically add newId
  const newId = nations[nations.length - 1].id + 1;
  //newTour(body.req) | Object.assign(to create a new object by merging two existing objects)
  const newNation = Object.assign({ id: newId }, req.body);
  // 2. PUT THE NEW OBJECT IN TO ARRAY OBJECT
  nations.push(newNation);
  // 3. WRITE IT TO FILE (non-blocking)
  fs.writeFile(
    `${__dirname}/../data/nations.json`,
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
exports.updateNationPatch = (req, res) => {
  const body = req.body
  // Find id
  const id = req.params.id * 1;
  const nationToUpdate = nations.find((el) => el.id === id);
  // Err handle
  if ("id" in body) {
    res.status(500).json({
      status: "fail",
      message: "No update with id",
    });
    return;
  }
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
    `${__dirname}/../data/nations.json`,
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
exports.updateNationPut = (req, res) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /nations");
};
exports.deleteAllNations = (req, res) => {
  // Clear the nations array
  nations.length = 0;
  // Update the JSON file with an empty array
  fs.writeFile(
    `${__dirname}/../data/nations.json`,
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
exports.deleteNationById = (req, res) => {
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
      `${__dirname}/../data/nations.json`,
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
