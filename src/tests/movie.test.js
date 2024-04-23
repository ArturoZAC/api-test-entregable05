require("../models")
const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const URL_BASE='/api/v1/movies'
const movie={
    name: "Pulp Fiction",
    image: "pulp.com",
    synopsis: "The lives of a boxer, two hitmen, a gangster's wife and two bandits are intertwined in a story of violence and redemption.",
    releaseYear: 21/5/1994
}

let movieId

test("POST -> URL_BASE, should return statusCode 201, res.body.name === movie.name", async()=>{
    const res = await request(app)
        .post(URL_BASE)
        .send(movie)

    movieId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GET ALL -> URL_BASE, should return statusCode 200, res.body.length === 1", async()=>{
    const res = await request(app)
        .get(URL_BASE)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

test("UPDATE -> URL_BASE/:id, should return statusCode 200, res.body.name === updateBody.name", async()=>{

    const updateBody={
        name: "The wolf of wall street",
        image: "wolf.com",
        synopsis: "The story of New York stockbroker Jordan Belfort, who, in his early twenties, was nicknamed 'the wolf of Wall Street' for his enormous success and fortune as founder of the Stratton Oakmont stock brokerage.",
        releaseYear: 11/6/2013
    }

    const res = await request(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(updateBody)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(updateBody.name)
})

test("POST -> URL_BASE/:id/actors, should return statusCode 200, res.body.length === 1", async()=>{
    const actor = {
        firstName: "Edward",
        lastName: "Norton",
        nationality: "USA",
        image: "Norton.com",
        birthday: "1985"
    }

    const createActor = await Actor.create(actor)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/actors`)
        .send([createActor.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    await createActor.destroy()
})

test("POST -> URL_BASE/:id/directors, should return statusCode 200, res.body.length === 1", async()=>{
    const director = {
        firstName: "David",
        lastName: "Fincher",
        nationality: "USA",
        image: "Fincher.com",
        birthday: "1976"
    }

    const createDirector = await Director.create(director)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/directors`)
        .send([createDirector.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    await createDirector.destroy()
})

test("POST -> URL_BASE/:id/genres, should return statusCode 200, res.body.length === 1", async()=>{
    const genre = {
        name: "Comedy"
    }

    const createGenre = await Genre.create(genre)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/genres`)
        .send([createGenre.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    await createGenre.destroy()
})



test("DELETE -> URL_BASE/:id, should return statusCode 204", async()=>{
    const res = await request(app)
        .delete(`${URL_BASE}/${movieId}`)

        expect(res.statusCode).toBe(204)
})