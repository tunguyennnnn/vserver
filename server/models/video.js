'use strict'
module.exports = (sequelize, DataTypes) => {
  var Video = sequelize.define('Video', {
    url: DataTypes.STRING,
    title: DataTypes.STRING
  }, {})
  Video.associate = (models) => {
    // associations can be defined here
  }
  return Video
}
