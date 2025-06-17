import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const FavoriteController = {
  // Adicionar livro favorito
  async adicionar(req, res) {
    const { bookId } = req.body;
    const userId = req.usuario.id;

    if (!bookId) {
      return res.status(400).json({ erro: "bookId é obrigatório" });
    }

    try {
      // Verifica se já está favoritado
      const favoritoExistente = await prisma.favorite.findFirst({
        where: { userId, bookId },
      });

      if (favoritoExistente) {
        return res.status(409).json({ erro: "Livro já está nos favoritos" });
      }

      const favorito = await prisma.favorite.create({
        data: { userId, bookId },
      });

      res.status(201).json(favorito);
    } catch (err) {
      console.error("Erro ao adicionar favorito:", err);
      res
        .status(500)
        .json({ erro: "Erro ao adicionar favorito", detalhes: err.message });
    }
  },

  // Listar favoritos do usuário
  async listar(req, res) {
    const userId = req.usuario.id;

    try {
      const favoritos = await prisma.favorite.findMany({
        where: { userId },
        include: { book: true },
      });

      res.status(200).json(favoritos);
    } catch (err) {
      console.error("Erro ao listar favoritos:", err);
      res
        .status(500)
        .json({ erro: "Erro ao listar favoritos", detalhes: err.message });
    }
  },

  // Remover favorito
  async remover(req, res) {
    const userId = req.usuario.id;
    const { id } = req.params;

    try {
      const favorito = await prisma.favorite.findUnique({
        where: { id: Number(id) },
      });

      if (!favorito || favorito.userId !== userId) {
        return res.status(404).json({ erro: "Favorito não encontrado" });
      }

      await prisma.favorite.delete({ where: { id: Number(id) } });

      res.status(204).send();
    } catch (err) {
      console.error("Erro ao remover favorito:", err);
      res
        .status(500)
        .json({ erro: "Erro ao remover favorito", detalhes: err.message });
    }
  },
};

export default FavoriteController;
