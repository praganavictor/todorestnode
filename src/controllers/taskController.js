const mongoose = require("mongoose");

const Task = mongoose.model("Task");
const Comment = mongoose.model("Comment");

module.exports = {
  async profile(req, res) {
    const tasks = await Task.find({ user: req.userId });

    return res.json({ tasks, user: req.userId });
  },

  async index(req, res) {
    const tasks = await Task.find().populate(["user", "comments"]);

    return res.json({ tasks });
  },

  async show(req, res) {
    const task = await Task.findById(req.params.id).populate([
      "user",
      "comments"
    ]);

    return res.json(task);
  },

  async create(req, res) {
    const { title, description, comments } = req.body;
    const task = await Task.create({ title, description, user: req.userId });

    await Promise.all(
      comments.map(async comment => {
        const taskComment = new Comment({
          ...comment,
          task: task._id,
          assignedTo: req.userId
        });

        await taskComment.save();

        task.comments.push(taskComment);
      })
    );

    await task.save();

    return res.json({ task });
  },

  async update(req, res) {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(task);
  },

  async destroy(req, res) {
    await Task.findByIdAndDelete(req.params.id);

    return res.send();
  }
};
