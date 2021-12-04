import swDocument from "./swagger.def";
import loginRouter from "./routes/login";

const { sequelize, User } = require("./models");
const bodyParser = require("body-parser").json();

const express = require("express"),
  http = require("http"),
  swaggerUI = require("swagger-ui-express");
const app = express();

const server = http.createServer(app);
const hostname = "0.0.0.0";
const port = 3001;

app.use(bodyParser);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swDocument));
app.use("/login", loginRouter);

app.use(express.json());

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/api-docs`);
  // await sequelize.authenticate();
  await sequelize.sync()
  app.use(UserRouter)
  console.log("Database connected");
});

// HTTP REQUEST
import { UserRouter } from "./routes/user.routes"


//! POST
// app.post("/users", async (req: any, res: any) => {
//   const { fio, login, password, email, phone, role } = req.body;

//   try {
//     const user = await User.create({ fio, login, password, email, phone, role });
     

//     return res.json(user);
//   } catch (err) {
//     console.log(err)
//   return res.json(err);
//   }
// });
//! POST


// app.get("/users", async (req: any, res: any) =>{
//   try {
//     const users = await User.findAll()

//     return res.json(users)
//   }catch (err) {
//     console.log(err)
//     return res.json(err);
//   }
// })

// app.get("/user/:id", async (req: any, res: any) =>{
//   const id = req.params.id
//   try {
//     const user = await User.findOne({
//       where: { id }
//     })

//     return res.json(user)
//   }catch (err) {
//     console.log(err)
//     return res.json(err);
//   }
// })

// app.delete("/user/:id", async (req: any, res: any) =>{
//   const id = req.params.id
//   try {
//     const user = await User.findOne({
//       where: { id }
//     })

//     await user.destroy();
//     return res.status(204).json({message: 'User deleted successfully'});
//   }catch (err) {
//     console.log(err)
//     return res.json(err);
//   }
// })