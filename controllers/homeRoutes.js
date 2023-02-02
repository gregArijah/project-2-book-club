const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


//GET all books for homepage
router.get('/', async (req, res) => {
  try {
    const dbBookData = await Bookshelf.findAll({
      include: [
        {
          model: Books,
          // attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    
    const bookshelves = dbBookshelfData.map((bookshelf) =>
      bookshelf.get({ plain: true })
    );
   

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      bookshelves, 
      LoggedIn: req.session.loggedIn, 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
// get bookshelf
router.get('/bookshelf/:id', async (req, res) => {
     // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the bookshelf
    try {
      const dbBookshelfData = await Bookshelf.findByPk(req.params.id, {
        include: [
          {
            model: Books,
            // attributes: [
            //   'id',
            //   'title',
            //   'artist',
            //   'exhibition_date',
            //   'filename',
            //   'description',
            // ],
          },
        ],
      });
      const bookshelf = dbBookshelfData.get({ plain: true });
      res.render('bookshelf', { bookshelf, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});


//get book
router.get('/book/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the book
    try {
      const dbBookData = await Book.findByPk(req.params.id);

      const Book = dbBookData.get({ plain: true });

      res.render('book', { book, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
