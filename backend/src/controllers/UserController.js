import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.SECRET || "chave_secreta";
const TOKEN_EXPIRE = "1h";

const UserController = {
  // Criar usuário
  async criar(req, res) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ erro: "Nome, email e senha são obrigatórios" });
    }

    const roleFormatado = role?.toUpperCase();

    if (roleFormatado !== "USER" && roleFormatado !== "ADMIN") {
      return res.status(400).json({ erro: "Role inválido. Use USER ou ADMIN" });
    }

    try {
      const usuarioExistente = await prisma.user.findUnique({
        where: { email },
      });
      if (usuarioExistente) {
        return res.status(409).json({ erro: "Email já cadastrado" });
      }

      const senhaHash = await bcrypt.hash(password, 10);

      const usuario = await prisma.user.create({
        data: {
          name,
          email,
          password: senhaHash,
          role: roleFormatado, // insere o role já validado e formatado
        },
      });

      res.status(201).json({
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role,
      });
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      res
        .status(500)
        .json({ erro: "Erro ao criar usuário", detalhes: err.message });
    }
  },

  // Login - gera token JWT com role
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    try {
      const usuario = await prisma.user.findUnique({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ erro: "Email ou senha inválidos" });
      }

      const senhaValida = await bcrypt.compare(password, usuario.password);
      if (!senhaValida) {
        return res.status(401).json({ erro: "Email ou senha inválidos" });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, role: usuario.role },
        SECRET,
        { expiresIn: TOKEN_EXPIRE }
      );

      res.status(200).json({ token });
    } catch (err) {
      console.error("Erro no login:", err);
      res.status(500).json({ erro: "Erro no login", detalhes: err.message });
    }
  },

  // Perfil do usuário (rota protegida)
  async perfil(req, res) {
    try {
      const usuario = await prisma.user.findUnique({
        where: { id: req.usuario.id },
        select: { id: true, name: true, email: true, role: true },
      });

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      res.status(200).json(usuario);
    } catch (err) {
      console.error("Erro ao buscar perfil:", err);
      res
        .status(500)
        .json({ erro: "Erro ao buscar perfil", detalhes: err.message });
    }
  },
};

export default UserController;
