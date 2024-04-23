const { getAll, create, getOne, remove, update, setGenresToMovies, setActorsToMovies, setDirectorsToMovies } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id/genres')
    .post(setGenresToMovies)

routerMovie.route('/:id/actors')
    .post(setActorsToMovies)

routerMovie.route('/:id/directors')
    .post(setDirectorsToMovies)

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;