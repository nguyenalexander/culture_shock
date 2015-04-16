"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("languagesusers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      languageId: {
        type: DataTypes.INTEGER
      },
      sp_fluency: {
        type: DataTypes.INTEGER
      },
      wr_fluency: {
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
    migration.dropTable("languagesusers").done(done);
  }
};