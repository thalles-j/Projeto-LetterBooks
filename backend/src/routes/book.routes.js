import express from 'express';
import BookController from '../controllers/BookController.js';


const router = express.Router();

router.get('/book', BookController.listar);
router.get('/book/:id', BookController.buscarPorId);


router.post('/book', BookController.criar);
router.put('/book/:id', BookController.editar);
router.delete('/book/:id', BookController.remover)

//router.post('/bulk', BookController.criarVarios)

export default router;
