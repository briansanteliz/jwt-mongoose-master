const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new Schema({
  usuario: String,
  email: String,
  password: String,
});

//agregando un metodo al schema para encryptar password con bcrypt.
schema.methods.encriptarPassword = async (password) => {
  const solve = await bcrypt.genSalt(10);
  const contraseña = await bcrypt.hash(password, solve);
  return contraseña;
};

//metodo para validad la contraseña, compara la contraseña del schema y la que se obtiene en el controlador.
schema.methods.validarPassword = function (password) {
  const result = bcrypt.compare(password, this.password);
  return result;
};

module.exports = model("Usuario", schema);
