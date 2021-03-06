'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};