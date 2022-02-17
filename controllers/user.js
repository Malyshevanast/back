// import { Request, Response } from "express";
const { User } = require("../models");

class UserController {

  

  async findOne(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findOne({
        where: { id },
      });

      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { fio, login, password, email, phone, role } = req.body;

    try {
      const user = await User.findOne({
        where: { id },
      });

      user.fio = fio;
      user.login = login;
      user.password = password;
      user.email = email;
      user.phone = phone;
      user.role = role;

      await user.save();

      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findOne({
        where: { id },
      });

      await user.destroy();
      return res.status(204).json({ message: "User deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  }
}

module.exports = new UserController();
