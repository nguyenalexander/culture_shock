"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      bio: {
        type: DataTypes.TEXT
      },
      picture: {
        type: DataTypes.TEXT
      },
      hobbies: {
        type: DataTypes.TEXT
      },
      phone: {
        type: DataTypes.STRING
      },
      userId: {
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
    migration.dropTable("profiles").done(done);
  }
};