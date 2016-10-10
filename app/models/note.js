'use strict';
module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define('Note', {
    content: DataTypes.TEXT
  })
  
  return Note
};
