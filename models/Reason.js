const mongoose = require('mongoose');
const { Schema } = mongoose;

const reasonSchema = new Schema({
  text: String,
  setBy: String,
  name: String
});

module.exports = reasonSchema;