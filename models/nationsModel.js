const mongoose = require('mongoose'); 

const nationSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'A nation must have a name'],
        unique: true, 
        trim: true,
    },
    createAt: {
        type: Date, 
        default: Date.now()
      },
})
// Always use uppercase for model name and variable
const Nation = mongoose.model('Nation', nationSchema); 
module.exports = Nation; 