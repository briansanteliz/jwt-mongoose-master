const { Router } = require("express");
const Usuario = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const router = Router();
const verifyToken = require("./verifyToken");

router.post("/register", async (req, res) => {
  const { usuario, email, password } = req.body;
  const newUser = new Usuario({
    usuario,
    email,
    password,
  });
  //del newUser.password uso el metodo asincrono, para encriptar el password
  newUser.password = await newUser.encriptarPassword(newUser.password);
  await newUser.save();

  //crando el token, toma como parametro el id, un secret.token y una confg para saber cuando expira.
  const token = jwt.sign({ id: newUser._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.json({ message: "Usuario Registrado!", auth: true, token });
});

router.get("/perfil", verifyToken, async (req, res) => {
  //busco el usuario por id, si existe mando sus datos sin el password.
  const findUser = await Usuario.findById(req.tokenDecodificadoId, {
    password: 0,
  });
  if (!findUser) {
    res.status(404).send("usuario no encontrado.");
    return;
  } else {
    res.json(findUser);
    return;
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const emailUser = await Usuario.findOne({ email });
  if (!emailUser) {
    res.status(404).send("este email no existe.");
    return;
  }
  //compara las contraseña usando el metodo validar password.
  const validacionPassword = await emailUser.validarPassword(password);
  if (!validacionPassword) {
    res
      .status(401)
      .json({ auth: false, message: "esta contraseña no es correcta." });
    return;
  }
  //si la contraseña es correcta genera en nuevo token y toma como parametro el id
  const tokenLogin = jwt.sign({ id: emailUser._id }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.json({ auth: true, tokenLogin });
});

module.exports = router;
