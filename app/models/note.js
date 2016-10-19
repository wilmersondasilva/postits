'use strict';
module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define('Note', {
    content: { type: DataTypes.TEXT, allowNull: false }
  })
  
  return Note
};
