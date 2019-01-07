const mongoose = require('mongoose');

const RegisterModelSchema = new mongoose.Schema({
  name : String,
  package : String,
  registers : [{
    name : String,
    coverageMode : String,
    size : Number,
    fields : [{
      name : String,
      size : Number,
      isRand : Number,
      access : String,
      dimension : Number,
      reset : Number,
      volatile : Number,
      lsbPos : Number,
      individuallyAccessible : Number,
      hasReset : Number
    }]
  }],
  blocks : [{
    name : String,
    map : {
      name : String,
      offset : String,
      size : Number,
      endian : String
    },
    mem : {
      name : String,
      offset : String,
      size : Number
    },
    fields : [{
      type : String,
      name : String,
      offset : String,
      access : String,
      dimension : Number,
    }]
  }]

});

module.exports = mongoose.model('RegisterModel', RegisterModelSchema);