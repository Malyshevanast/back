import swDocument from "./swagger.def";
import loginRouter from "./routes/login";

// * Routes
import { UserRouter } from "./routes/user"
import { ServiceRouter } from "./routes/service"
import { authRouter } from "./routes/auth";

const { sequelize } = require("./models");
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
// app.use("/auth", authRouter)

app.use(express.json());

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/api-docs`);
  await sequelize.sync()
  // await sequelize.authenticate();
  app.use(UserRouter, ServiceRouter, authRouter)
  console.log("Database connected");
});



