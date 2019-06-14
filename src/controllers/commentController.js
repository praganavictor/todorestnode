const mongoose = require("mongoose");

const comment = mongoose.model("comment");

module.exports = {
  async index(req, res) {
    const comments = await Comment.find().populate("user");

    return res.json({ comments });
  },

  async show(req, res) {
    const comment = await Comment.findById(req.params.id).populate("user");

    return res.json(comment);
  },

  async create(req, res) {
    const comment = await Comment.create({ ...req.body, user: req.userId });

    return res.json({ comment });
  },

  async update(req, res) {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(comment);
  },
  async destroy(req, res) {
    await Comment.findByIdAndDelete(req.params.id);

    return res.send();
  }
};
