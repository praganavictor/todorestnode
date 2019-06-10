const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const User = mongoose.model('User');

module.exports = {
  async register(req, res) {
    const { email } = req.body;

    try {
      if(await User.findOne({ email }))
        res.status(400).send({ error: 'Usuario já existe' });

      const user = await User.create(req.body);

      user.password = undefined;

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
      });  

      return res.json({ user, token });
    } catch (error) {
      res.status(400).send({ error: 'Falha ao registrar' });
    }
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
      return res.status(400).send({ error: 'Usuario não encontrado' });

    if(!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Verifique o email e a senha.' });
    
    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400
    });

    return res.json({ user, token });
  }
}