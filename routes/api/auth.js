const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = express.Router();

//get user info
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, '-password');

    if (!user) return res.status(404).send({ msg: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

//login
router.post(
  '/',
  [check('email').notEmpty().isEmail(), check('password').notEmpty],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) return res.status(401).send('Invalid Email/Password');

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(401).send('Invalid Email/Password');

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 1000 * 60 * 60 * 24 * 7,
        },
        (err, token) => {
          if (err) throw err;
          const options = {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            signed: true,
          };
          res.cookie('token', token, options);
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error', err: error.message });
    }
  }
);

module.exports = router;
