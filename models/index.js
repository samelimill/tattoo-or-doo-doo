const Comment = require('./Comment')
const Gallery = require('./Gallery')
const Post = require('./Post');
const Tattoo = require('./tattoo');
const User = require("./User");

User.hasMany(Tattoo, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})
Tattoo.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = { Comment, Gallery, Post, Tattoo, User };
