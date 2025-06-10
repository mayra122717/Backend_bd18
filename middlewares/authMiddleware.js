//Importar el JWT
const jwt = require('jsonwebtoken');
//funcion middleware req: la solicitud del cliente ; res:la respuesta al cliente; next: si el token es válido
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No se proporcionó el token' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer token123..."

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    // Guardamos los datos decodificados del token en req.user
    req.user = decoded;
    next(); // sigue al siguiente middleware o controlador
  });
};

module.exports = verifyToken;