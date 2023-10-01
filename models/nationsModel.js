const mongoose = require('mongoose'); 

const nationSchema = new mongoose.Schema({

})
// Always use uppercase for model name and variable
const Nation = mongoose.model('Nation', nationSchema); 
module.exports = Nation; 