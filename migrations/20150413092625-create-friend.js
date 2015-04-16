"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("friends", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email:{
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING
      },
      lat: {
        type: DataTypes.FLOAT
      },
      lng: {
        type: DataTypes.FLOAT
      },
      userId: {
        type: DataTypes.INTEGER
      },
      languageId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("friends").done(done);
  }
};