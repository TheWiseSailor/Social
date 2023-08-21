const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/socialnetworkdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT} 😃`);
});
