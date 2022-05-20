const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = function (roles) {
   return function (req, res, next) {
      if (req.method === "OPTIONS") {
         next()
      }

      try {
         const token = req.headers.authorization.split(" ")[1]

         if (!token) {
            return res.status(403).json({ message: "Пользователь не авторизован" })
         }

         const { role: userRole } = jwt.verify(token, process.env.AUTH_KEY)

         let hasRole = false

         if (roles == userRole) {
               hasRole = true
         }
         
         if (!hasRole) {
            return res.status(403).json({ message: "Недостаточно прав доступа" })
         }

         next()
      } catch (err) {
         console.log(err)
         return res.status(403).json({ message: "Ошибка обработки в коде" })
      }
   }

}

