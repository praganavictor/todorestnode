const mongoose = require('mongoose');

const Task = mongoose.model('Task');

module.exports = {
  async index(req, res) {
    const tasks = await Task.find();

    return res.json({ tasks, user: req.userId });
  },

  async show(req, res) {
    const task = await Task.findById(req.params.id);

    return res.json(task);
  },

  async create(req, res) {
    const task = await Task.create(req.body);

    return res.json(task);
  },

  async update(req, res) {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    return res.json(task);
  },
  async destroy(req, res) {
    await Task.findByIdAndDelete(req.params.id);

    return res.send();
  }
}