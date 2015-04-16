"use strict";

var bcrypt = require('bcrypt');
var geocoder = require('geocoder');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    location: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    friendId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.user.belongsToMany(models.user, {as: 'Friend', through: 'usersfriends'})
        models.user.belongsToMany(models.language, {through: 'languagesusers'});
        models.user.hasMany(models.provider);
      }
    },
    instanceMethods: {
      checkPassword: function(pass,callback){
        if(pass && this.password){
          bcrypt.compare(pass,this.password,callback);
        }else{
          callback(null,false)
        }
      }
    },
    hooks: {
      beforeCreate: function(user,options,sendback){
        if(user.location){
        geocoder.geocode(user.location, function(err,data){
          if (err) {sendback (err,null) }
            user.lat = data.results[0].geometry.location.lat;
            user.lng = data.results[0].geometry.location.lng;
          })
        }
        if(user.password){
          bcrypt.hash(user.password,10,function(err,hash){
            if(err) throw err;
            user.password=hash;
            sendback(null,user)
          })
        }else{
          sendback(null,user)
        }
      }
    }

  });
return user;
};