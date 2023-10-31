const Tattoo = require('./tattoo');
const User = require("./User");

User.hasMany(Tattoo, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})
Tattoo.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = { Tattoo, User };
