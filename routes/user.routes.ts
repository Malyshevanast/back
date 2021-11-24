// import user from "../models/user";

// const {sequelize, User} = require('../models')


// const express = require('express');
// const app = express();

// app.use(express.json());

// app.post('/users', async(req: any, res: any) => {
//   const { fio, login, password, email, phone, role} = req.body;

//   try {
//     await User.create({ fio, login, password, email, phone, role})

//     return res.json(user)
//   }catch (err) {
//     console.log(err)
//   }
// })