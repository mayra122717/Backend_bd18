const db = require('../db');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas (email)' });
    }

    const user = result.rows[0];

    // Comparar la contraseña directamente (texto plano)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Credenciales incorrectas (contraseña)' });
    }

    // Generar un token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '2m',
    });

    //Guardar token en la BD
    await db.query('UPDATE users SET session_token = $1 WHERE id= $2', [token,user.id]);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};