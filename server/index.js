const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./config/database");
<<<<<<< HEAD
const router = require("./routes/user.route");
=======
>>>>>>> 6a084fd22fec32b2d3835aa9b1ae72ae0538840a

let PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/", router);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server is not running on port ${PORT}`);
  });
