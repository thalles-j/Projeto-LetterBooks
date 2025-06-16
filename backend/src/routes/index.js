import express from 'express';
import book from './book.routes';
import favorite from './favorite.routes';
import user from './user.routes';

const routes = (app) => {
    app.routes("/").get((req,res) => res.status(200).send("API de livros funcionando!"));

    app.use(express.json(), book, favorite, user);

}

export default routes;