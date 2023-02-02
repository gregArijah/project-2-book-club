// const sequelize = require('../config/connection');
// const seedBook = require('./bookData');
// const seedUsers = require('./userData');

// const seedAll = async () => {
//   await sequelize.sync({ force: true });

//   await seedBook();

//   await seedUsers();

//   process.exit(0);
// };

// seedAll();

const sequelize = require('../config/connection');
const { User, Book, Comment } = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const book of bookData) {
    await Book.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const comment = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();