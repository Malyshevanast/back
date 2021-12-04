import express from "express";

const router = express.Router();

const UserController = require("../controllers/user.controller");

router.post('/users', UserController.create)

router.get('/users', UserController.findAll)

router.get('/user/:id', UserController.findOne)

router.put('/user/:id', UserController.update)

router.delete('/user/:id', UserController.delete)





export { router as UserRouter }
