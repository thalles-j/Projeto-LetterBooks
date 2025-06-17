import express from 'express';
import FavoriteController from '../controllers/FavoriteController.js';
import { autenticarToken} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', autenticarToken, FavoriteController.adicionar); // qualquer usuário autenticado pode favoritar
router.get('/', autenticarToken, FavoriteController.listar);
router.delete('/:id', autenticarToken, FavoriteController.remover);

export default router;
