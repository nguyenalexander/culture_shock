"use strict";
module.exports = function(sequelize, DataTypes) {
  var language = sequelize.define("language", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.language.belongsToMany(models.user, {through: 'languagesusers'});
        models.language.hasMany(models.friend);
      }
    }
  });
  return language;
};