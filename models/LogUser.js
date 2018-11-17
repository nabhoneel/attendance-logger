const mongoose = require('mongoose');
const { Schema } = mongoose;

const logUserSchema = new Schema({
  googleID: String,
  name: String
});

module.exports = logUserSchema;