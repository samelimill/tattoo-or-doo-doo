const sequelize = require('../config/connection');
const seedTattoos = require('./tattooData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync ({ force: true });

  await seedTattoos();
  await seedUsers();

  process.exit(0);
};

seedAll();