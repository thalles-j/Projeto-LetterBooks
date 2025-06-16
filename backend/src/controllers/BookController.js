import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  //GET /book
  async listar(req, res) {
    try {
      const livros = await prisma.book.findMany();
      res.json(livros);
    } catch (err) {
      console.error("Erro ao listar livros:", err);
      res
        .status(500)
        .json({ erro: "Erro ao listar livros", detalhes: err.message });
    }
  },

  //POST /book
  async criar(req, res) {
    const { title, author, rating } = req.body;
    try {
      const livro = await prisma.book.create({
        data: { title, author, rating },
      });
      res.status(201).json(livro);
    } catch (err) {
      console.error("Erro ao criar livro:", err);
      res
        .status(500)
        .json({ erro: "Erro ao criar livro", detalhes: err.message });
    }
  },
  
  //PUT /book/id:
  async editar(req, res) {
    const { id } = req.params;
    const { title, author, rating } = req.body;
    if (!title || !author || rating == null) {
      return res.status(400).json({
        erro: "Campos obrigatórios ausentes. Envie título, author e nota.",
      });
    }

    try {
      const livro = await prisma.book.update({
        where: { id: Number(id) },
        data: { title, author, rating },
      });
      res.json(livro);
    } catch (err) {
      console.error(`Erro ao editar livro com ${id}:`, err);
      res
        .status(404)
        .json({ erro: "Livro não encontrado", detalhes: err.message });
    }
  },
};
