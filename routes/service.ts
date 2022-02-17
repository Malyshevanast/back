import express from "express";

const router = express.Router();

const ServiceController = require("../controllers/service");

router.post('/services', ServiceController.create)

router.get('/services', ServiceController.findAll)

router.get('/services/:id', ServiceController.findOne)

router.put('/services/:id', ServiceController.update)

router.delete('/services/:id', ServiceController.delete)





export { router as ServiceRouter }