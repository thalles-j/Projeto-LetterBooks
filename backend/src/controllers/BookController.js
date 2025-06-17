import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class BookController {
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
  };
  //GET por ID /book/:id
  async buscarPorId(req, res) {
  const { id } = req.params;

  try {
    const livro = await prisma.book.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    res.status(200).json(livro);
  } catch (err) {
    console.error("Erro ao buscar livro:", err);
    res.status(500).json({ erro: "Erro ao buscar livro", detalhes: err.message });
  }
};


  //POST /book
  async criar(req, res) {
  const { title, author, rating } = req.body;

  if (!title) {
    return res.status(400).json({ erro: "O título é obrigatório" });
  }

  try {
    const livro = await prisma.book.create({
      data: { title, author, rating },
    });
    res.status(201).json(livro);
  } catch (err) {
    console.error("Erro ao criar livro:", err);
    res.status(500).json({ erro: "Erro ao criar livro", detalhes: err.message });
  }
}


  //PUT /book/:id
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
  };

  //DELETE /book/:id
  async remover(req,res){
    const {id} = req.params;

    try{
      await prisma.book.delete({
        where: {id: Number(id) }
      });
      res.status(204).send(`Livro com id:${id} foi deletado!`);
    } catch (err) {
      console.error(`Erro ao deletar livro com ${id}:`, err);
      res
        .status(404)
        .json({ erro: "Livro não encontrado", detalhes: err.message });
    }
  };
  /*
  async criarVarios(req, res) {
    const livros = req.body;

    if (!Array.isArray(livros) || livros.length === 0) {
      return res.status(400).json({ erro: "Envie uma lista de livros" });
    }

    // Verifica se todos os livros têm title e author
    const livrosInvalidos = livros.filter(
      (livro) => !livro.title || !livro.author
    );

    if (livrosInvalidos.length > 0) {
      return res
        .status(400)
        .json({ erro: "Todos os livros devem ter título e autor" });
    }

    try {
      // Busca os títulos já existentes
      const titulos = livros.map((l) => l.title);
      const livrosExistentes = await prisma.book.findMany({
        where: { title: { in: titulos } },
        select: { title: true },
      });

      const titulosExistentes = livrosExistentes.map((l) => l.title);

      // Filtra os que ainda não existem
      const livrosParaInserir = livros.filter(
        (livro) => !titulosExistentes.includes(livro.title)
      );

      if (livrosParaInserir.length === 0) {
        return res
          .status(409)
          .json({ erro: "Todos os títulos já existem no banco" });
      }

      // Insere os novos livros
      const resultado = await prisma.book.createMany({
        data: livrosParaInserir,
        skipDuplicates: true, // segurança extra, evita erro de título duplicado
      });

      res.status(201).json({
        mensagem: `${resultado.count} livros criados com sucesso`,
        inseridos: livrosParaInserir,
      });
    } catch (err) {
      console.error("Erro ao criar livros:", err);
      res
        .status(500)
        .json({ erro: "Erro ao criar livros", detalhes: err.message });
    }
  };
  */
};

export default new BookController;