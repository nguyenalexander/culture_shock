"use strict";
module.exports = function(sequelize, DataTypes) {
  var languagesusers = sequelize.define("languagesusers", {
    userId: DataTypes.INTEGER,
    languageId: DataTypes.INTEGER,
    sp_fluency: DataTypes.INTEGER,
    wr_fluency: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return languagesusers;
};