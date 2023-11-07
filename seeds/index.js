const sequelize = require('../config/connection');
const { User, Tattoo } = require('../models');

const tattooData = require('./tattooData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(tattooData,{
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();