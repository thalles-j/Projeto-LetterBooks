import express from 'express';
import UserController from '../controllers/UserController.js';
import { autenticarToken, autorizarAdmin }  from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/users/registre', UserController.criar);

// Login usuário
router.post('/users/login', UserController.login);

// Rota protegida - perfil do usuário (precisa de token válido)
router.get('/users/profile', autenticarToken, UserController.perfil);

//Rota All
router.get('/users', UserController.listarTodos);

export default router;

/*

{
  "name": "Mariana Silva",
  "email": "mariana.silva@example.com",
  "password": "Senha123!",
  "role": "admin"
}

{
  "name": "Lucas Oliveira",
  "email": "lucas.oliveira@example.com",
  "password": "Senha123!",
  "role": "user"
}

*/