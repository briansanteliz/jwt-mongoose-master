const jwt = require("jsonwebtoken");
const config = require("../config");
//middleware para extraer el id
function verifyToken(req, res, next) {
  //obtengo informacion de los headers
  const tokenCodificado = req.headers["x-access-token"];
  //verifico el token.
  if (!tokenCodificado) {
    res.status(401).json({ auth: false, message: "no estas autorizado." });
    return;
  }
  //si existe decodificalo
  const tokenDecodificado = jwt.verify(tokenCodificado, config.secret);
  //lo guardo en el objeto de req de los handleFunctions.
  req.tokenDecodificadoId = tokenDecodificado.id;
  next();
}

module.exports = verifyToken;
