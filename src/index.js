const app = require("./app");
require("./database");
const routes = require("./controllers/authController");

//iniciando la app
const init = async () => {
  await app.listen(3000);
  console.log(`Server on port 3000`);
};
init();
app.use(routes);
