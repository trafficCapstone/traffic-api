const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  id: Number,
  name: String,
  location: [Number],
});

const CameraModel = mongoose.model('Camera', cameraSchema, 'cameras');

module.exports = CameraModel;
