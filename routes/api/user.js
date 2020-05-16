const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

//get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

//register User
router.post(
  '/',
  [
    auth,
    check('username').notEmpty().escape(),
    check('email').notEmpty().isEmail().normalizeEmail(),
    check('password').notEmpty().isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPass });
      await newUser.save();

      const payload = {
        user: {
          id: newUser._id,
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

      if (error.keyPattern.username)
        return res.status(500).send('Username has been taken');

      if (error.keyPattern.email)
        return res.status(500).send('Email has been taken');

      res.status(500).json({ msg: 'Server Error', err: error.message });
    }
  }
);

//delete user
router.delete('/:user_id', auth, async (req, res) => {
  const { user_id } = req.params;
  try {
    if (user_id !== req.user.id)
      return res.status(422).send('Not authorize to take that action');

    await User.findByIdAndRemove(user_id);

    res.send('User deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

//add a pokemon to your team
router.put(
  '/pokemon/:id',
  [auth, check('nickname').escape()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { nickname } = req.body;
    const { id } = req.params;
    try {
      const user = await User.findById(req.user.id);

      if (!user) return res.status(401).send('Invalid Account');

      const updatePokemonTeam = await User.findOneAndUpdate(
        { _id: req.user.id, 'pokemonTeam._id': id },
        {
          $set: {
            'pokemonTeam.$.nickname': nickname,
          },
        },
        { new: true }
      );

      res.send(updatePokemonTeam);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error', err: error.message });
    }
  }
);

//delete a pokemon in your team
router.delete('/pokemon/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(401).send('Invalid Account');

    const updatedPokemonTeam = await User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      { $pull: { pokemonTeam: { _id: id } } },
      { new: true }
    );

    res.send(updatedPokemonTeam);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

module.exports = router;
