require("../models")
const request = require("supertest");
const app = require("../app")

const URL_BASE='/api/v1/directors'
const director = {
    firstName: "Martin",
    lastName: "Scorcese",
    nationality: "USA",
    image: "M¿martin.com",
    birthday: "1954"
}

let directorId

test("POST -> URL_BASE, should return statusCode 201, res.body.name === director.name", async()=>{
    const res = await request(app)
        .post(URL_BASE)
        .send(director)

    directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
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
        firstName: "Quentin",
        lastName: "Tarantino",
        nationality: "USA",
        image: "quentin.com",
        birthday: "1977"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${directorId}`)
        .send(updateBody)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(updateBody.name)
})

test("DELETE -> URL_BASE/:id, should return statusCode 204", async()=>{
    const res = await request(app)
        .delete(`${URL_BASE}/${directorId}`)

        expect(res.statusCode).toBe(204)
})