const mongoosee = require("mongoose");

//iniciando la base de datos
mongoosee
  .connect("mongodb://localhost/jwt-example", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("db is connected"))
  .catch((e) => console.log(e));
