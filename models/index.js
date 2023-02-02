const User = require('./User');
const Book = require('./Book');
const Comment = require('./Comment');

User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});

Book.hasMany(Comment,{
  foreignKey: 'post_id'
})
module.exports = { User, Book, Comment };
