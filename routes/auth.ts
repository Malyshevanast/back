import express from "express";


const router = express.Router();
const {check} = require("express-validator")
const authController = require("../controllers/auth");
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")


router.post('/api/singup', [
   check("login", "Имя пользователя должно быть введено").notEmpty(),
   check("password", "Пароль должен быть большей 4-х символов").isLength(4),
], authController.singup)

router.post('/api/login', authController.login)

router.get('/getusers', roleMiddleware(["Admin"]), authController.getUsers)




export { router as authRouter }