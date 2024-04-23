require("../models")
const request = require("supertest");
const app = require("../app")

const URL_BASE='/api/v1/actors'
const actor = {
    firstName: "Brad",
    lastName: "Pitt",
    nationality: "USA",
    image: "bradpit.com",
    birthday: "1983"
}

let actorId

test("POST -> URL_BASE, should return statusCode 201, res.body.name === actor.name", async()=>{
    const res = await request(app)
        .post(URL_BASE)
        .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
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
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "USA",
        image: "leonardo.com",
        birthday: "1989"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${actorId}`)
        .send(updateBody)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(updateBody.name)
})

test("DELETE -> URL_BASE/:id, should return statusCode 204", async()=>{
    const res = await request(app)
        .delete(`${URL_BASE}/${actorId}`)

        expect(res.statusCode).toBe(204)
})