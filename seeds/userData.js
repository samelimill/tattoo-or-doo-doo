const { User } = require('../models');

const userdata = [
  {
    username: 'admin',
    password: 'admin',
  },
]

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;