"use strict";
module.exports = function(sequelize, DataTypes) {
  var profile = sequelize.define("profile", {
    bio: DataTypes.TEXT,
    picture: DataTypes.TEXT,
    hobbies: DataTypes.TEXT,
    phone: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.profile.belongsTo(models.user);
      }
    }
  });
  return profile;
};