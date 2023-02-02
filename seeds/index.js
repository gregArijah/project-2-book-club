const sequelize = require('../config/connection');
const seedBook = require('./bookData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBook();

  await seedUsers();

  process.exit(0);
};

seedAll();