const { User } = require("../models");
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const role = "User"

function generateAccessToken(id, role) {
   const payload = {
      id,
      role
   }

   return jwt.sign(payload, process.env.AUTH_KEY, { expiresIn: "1h" })
}

class authController {
   async singup(req, res) {
      const errors = validationResult(req)
      const { fio, login, password, email, phone } = req.body;

      try {
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Ошибка при регистрации", errors })
         }
         const candidate = await User.findOne({
            where: { login } && { email }
         })
         if (candidate) {
            return res.status(400).json({ message: "Пользователь уже существует" })
         }

         const hashPassword = bcrypt.hashSync(password, 7)
         const user = await User.create({
            fio,
            login,
            password: hashPassword,
            email,
            phone,
            role
         })

         res.status(200).json({
            message: "Пользователь зарегистрирован",
            user
         })
      } catch (err) {
         console.log(err)
         res.status(400).json({ message: "Sing up error" })
      }
   }

   async login(req, res) {

      try {
         const { login, password, } = req.body;

         const user = await User.findOne({
            where: { login }
         })
         if (!user) {
            res.status(400).json({ message: "Пользователь не найден" })
         }

         const validPassword = bcrypt.compareSync(password, user.password)
         if (!validPassword) {
            res.status(400).json({ message: "Неверный пароль" })
         }

         const token = generateAccessToken(user._id, user.role)

         return res.json({ token })
      } catch (err) {
         console.log(err)
         res.status(400).json({ message: "Log in error" })
      }
   }

   async getUsers(req, res) {

      try {
         const users = await User.findAll();

         return res.json(users);
      } catch (err) {
         console.log(err);
         return res.json(err);
      }

   }
}

module.exports = new authController();