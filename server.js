require("dotenv").config()

const app = require("./src/app");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(cookieParser());
