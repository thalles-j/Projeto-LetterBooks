import express from 'express';
import book from './book.routes.js';
import favorite from './favorite.routes.js';
import user from './user.routes.js';

const routes = (app) => {
    app.routes("/").get((req,res) => res.status(200).send("API de livros funcionando!"));

    app.use(express.json(), book, favorite, user);

}

export default routes;