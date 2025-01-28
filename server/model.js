const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: "To Do" },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = model("User", userSchema);
const Task = model("Task", taskSchema);

module.exports = { User, Task };
