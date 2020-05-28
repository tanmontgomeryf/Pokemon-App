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
    check('username').notEmpty().escape(),
    check('email').notEmpty().isEmail().normalizeEmail(),
    check('password').notEmpty().isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    console.log(req.body);
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

//logout user
router.get('/logout', auth, async (req, res) => {
  try {
    const options = {
      maxAge: -1,
      httpOnly: true,
      signed: true,
    };
    res.cookie('token', 'logout', options);
    res.send('Successfully logged out');
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

//get user
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById(user_id, '-password');

    if (!user) return res.status(404).send({ msg: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    console.log(error);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

//add pokemon to user team
router.post('/:user_id', auth, async (req, res) => {
  const { pokemonDetails, id } = req.body;
  const { user_id } = req.params;
  try {
    if (user_id !== req.user.id)
      return res.status(422).send('Not authorize to take that action');

    const user = await User.findById(user_id);

    if (!user) return res.status(401).send('Invalid credentials');

    if (user.pokemonTeam.length >= 6)
      return res.status(422).send('Your team is full!');

    const updatePokemonTeam = await User.findByIdAndUpdate(
      user_id,
      {
        $push: {
          pokemonTeam: {
            pokemonDetails,
            nickname: pokemonDetails.name,
            id,
          },
        },
      },
      { new: true }
    );

    res.send(updatePokemonTeam.pokemonTeam);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

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

//put nickname on your pokemon
router.put(
  '/:user_id/pokemon/:id',
  [auth, check('nickname').escape()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { nickname } = req.body;
    const { user_id, id } = req.params;
    try {
      if (user_id !== req.user.id)
        return res.status(422).send('Not authorize to take that action');

      const user = await User.findById(user_id);

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

      res.send(updatePokemonTeam.pokemonTeam);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error', err: error.message });
    }
  }
);

//delete a pokemon in your team
router.delete('/:user_id/pokemon/:id', auth, async (req, res) => {
  const { user_id, id } = req.params;
  try {
    if (user_id !== req.user.id)
      return res.status(422).send('Not authorize to take that action');

    const user = await User.findById(user_id);

    if (!user) return res.status(401).send('Invalid Account');

    const updatedPokemonTeam = await User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      { $pull: { pokemonTeam: { _id: id } } },
      { new: true }
    );

    res.send(updatedPokemonTeam.pokemonTeam);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error', err: error.message });
  }
});

module.exports = router;
