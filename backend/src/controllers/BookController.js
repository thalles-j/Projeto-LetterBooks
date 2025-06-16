import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient;

export default {
    async listar(req, res) {
    try {
      const livros = await prisma.book.findMany();
      res.json(livros);
    } catch (err) {
      console.error('Erro ao listar livros:', err);
      res.status(500).json({ erro: 'Erro ao listar livros', detalhes: err.message });
    }
  },

  async criar(req, res) {
    const { title, author, rating } = req.body;
    try {
      const livro = await prisma.book.create({
        data: { title, author, rating }
      });
      res.status(201).json(livro);
    } catch (err) {
      console.error('Erro ao criar livro:', err);
      res.status(500).json({ erro: 'Erro ao criar livro', detalhes: err.message });
    }
  },
}