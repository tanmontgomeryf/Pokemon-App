const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const router = express.Router();

//register User
router.post('/', async (req, res) => {
  console.log(req.headers.authorization);
  const { name, email, password } = req.body;

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPass });
    await newUser.save();

    const payload = {
      user: {
        id: newUser._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      {
        expiresIn: 1000 * 60 * 60 * 24 * 7,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, (req, res) => {
  res.send('private route');
});

module.exports = router;
