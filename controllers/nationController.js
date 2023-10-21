const Nation = require("./../models/nationsModel");

const fs = require("fs");

// middleware checkID in req.body
exports.checkBodyId = (req, res, next) => {
  const body = req.body;
  if ("id" in body) {
    return res.status(404).json({
      status: "fail",
      message: "No update with id",
    });
  }
  next();
};

// NATIONS
exports.getAllNation = async (req, res) => {
  try {
    const nations = await Nation.find();
    // Jsend
    res.status(200).json({
      status: "success",
      results: nations.length,
      data: {
        nations: nations,
      },
    });
  } catch (error) {
    res.status.json({
      status: "fail",
      message: error,
    });
  }
};
exports.getNationById = async (req, res) => {
  try {
    const nation = await Nation.findById(req.params.id); //Nation.findOne({ _id: req.params.id })
    // Success
    res.status(200).json({
      status: "success",
      data: {
        nations: nation,
      },
    });
  } catch (error) {
    res.status.json({
      status: 'fail',
      message: error,
    });
  }
};
exports.createNation = async (req, res) => {
  try {
    const newNation = await Nation.create(req.body)
    //201 - created
    res.status(201).json({
      status: "success",
      data: {
        nations: newNation,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.updateNationPatch = async (req, res) => {
  try {
    const nationToUpdate = await Nation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, //Cái này để validator(vd nếu như price thì k thể để String đc )
    })
    res.status(200).json({
      status: "success",
      data: {
        players: nationToUpdate,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
  
 
};
exports.updateNationPut = (req, res) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /nations");
};
// exports.deleteAllNations = (req, res) => {
//   // Clear the nations array
//   nations.length = 0;
//   // Update the JSON file with an empty array
//   fs.writeFile(
//     `${__dirname}/../data/nations.json`,
//     JSON.stringify(nations),
//     (err) => {
//       if (err) {
//         // Handle any errors that may occur during file write
//         res.status(500).json({
//           status: "error",
//           message: "Failed to delete all nations",
//         });
//       } else {
//         // Success response
//         res.status(203).json({
//           status: "success",
//           data: {
//             message: "All nations deleted successfully",
//           },
//         });
//       }
//     }
//   );
// };
exports.deleteNationById = async (req, res) => {
  try {
    await Nation.findByIdAndDelete(req.params.id);
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
