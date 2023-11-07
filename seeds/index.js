const sequelize = require('../config/connection');
const { User, Tattoo } = require('../models');

const userData = require('./userData.json');
const tattooData = require('./tattooData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Tattoo.bulkCreate(tattooData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();