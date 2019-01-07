const mongoose = require('mongoose');

require('../model/RegisterModel');

const MONGODB_URI = 'mongodb://admin:8Uhq39avAfyGPAT@ds151282.mlab.com:51282/heroku_1m8n95p6';

const RegisterModel = mongoose.model('RegisterModel');

function setUpConnection() {
  mongoose.connect(MONGODB_URI);
}

function listModels() {
  return RegisterModel.find();
}

function findByName(name) {
  return RegisterModel.findOne({name : name});
}

function updateModel(name, data) {
  return RegisterModel.findOne({name : name}).update(data);
}

function deleteModel(id) {
  return RegisterModel.findByIdAndDelete(id);
}

function createModel(data) {
  const model = new RegisterModel({
    name: data.name,
    package: data.package,
    registers: data.registers,
    blocks: data.blocks
  });

  return model.save();
}

module.exports = {
  setUpConnection, listModels, findByName, createModel, deleteModel, updateModel
};