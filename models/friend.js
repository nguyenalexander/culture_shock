"use strict";
module.exports = function(sequelize, DataTypes) {
  var friend = sequelize.define("friend", {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    languageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.friend.belongsTo(models.language);
        models.friend.belongsTo(models.user);
      }
    }
  });
  return friend;
};