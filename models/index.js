const User = require('./User');
const Book = require('./Book');
const Comment = require('./Comment');

// User.hasMany(Post, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Book.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// Post.hasMany(Comment,{
//   foreignKey: 'post_id'
// })
module.exports = { User, Book, Comment };
