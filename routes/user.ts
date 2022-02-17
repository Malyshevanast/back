import express from "express";

const router = express.Router();

const UserController = require("../controllers/user");

router.get('/user/:id', UserController.findOne)

router.put('/user/:id', UserController.update)

router.delete('/user/:id', UserController.delete)



export { router as UserRouter }
