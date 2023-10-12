const mongoose = require('mongoose'); 

const playerSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: [true, 'A player must have a name'], 
        unique: true, 
        trim: true,
    },
    position: {
        type: String, 
        trim: true,
        required: [true, 'A player must have a position']
    },
    description: {
        type: String, 
        trim: true,
        required: [true, 'A player must have a description']
      },
      createAt: {
        type: Date, 
        default: Date.now()
    },

})
// Always use uppercase for model name and variable
const Player = mongoose.model('Player', nationSchema); 
module.exports = Player; 