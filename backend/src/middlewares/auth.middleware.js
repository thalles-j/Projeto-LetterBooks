import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'chave_secreta';

export function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ erro: "Token não fornecido" });

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: "Token inválido" });

    req.usuario = usuario; // { id, email, role, ... }
    next();
  });
};

export function autorizarAdmin(req, res, next) {
  if (req.usuario.role !== 'admin') {
    return res.status(403).json({ erro: "Acesso negado. Admins somente." });
  }
  next();
};
