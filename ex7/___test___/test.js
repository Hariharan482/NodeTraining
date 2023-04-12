const express = require('../index');
let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN0ZXZlIiwiaWF0IjoxNjgxMzMwMTU2LCJleHAiOjE2ODE0MTY1NTZ9.Ibx92Kf9Taxcg2TUqPQtQBLI9lGUF_09r7AR5cSKtUk";
const supertest = require('supertest');

describe("Sign Up", () => {
    test("Register New User", async () => {
        const response = await supertest(express).post('/user/register').send({
            "username": "thanika","password": "1234567890"
        });
        console.log(response.body.message);
        expect(response.body.message).toBe("successfull");
    })
});

describe("Sign Up", () => {
    test("Register Existing User", async () => {
        const response = await supertest(express).post('/user/register').send({
            "username": "thanika",
            "password": "1234567890"
        });
        expect(response.text).toBe("user already exists");
    })
});

describe("Login", () => {
    test("Successful Login", async () => {
        const response = await supertest(express).post('/user/login').send({
            "username": "Steve",
            "password": "12345"
        });
        expect(response.body.message).toBe("logged in");
    })
});

describe("Login", () => {
    test("User not found", async () => {
        const response = await supertest(express).post('/user/login').send({
            "username": "Steve",
            "password": "123456"
        });
        expect(response.text).toBe("not found");
    })
});

describe("Adding Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).post('/tasks/').send({
    });
        expect(response.text).toBe("token not found");
    })
});

describe("Reading Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).get('/tasks/').send();
        expect(response.text).toBe("token not found");
    })
});

describe("Reading Specific Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).get('/tasks/2').send();
        expect(response.text).toBe("token not found");
    })    
});

describe("Update Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).put('/tasks/2').send();
        expect(response.text).toBe("token not found");
    })
});

describe("Delete Task", () => {
    test("Unauthorised Access", async () => {
        const response = await supertest(express).delete('/tasks/2').send();
        expect(response.text).toBe("token not found");
    })
});
describe("Delete Task", () => {
    test("Task not found", async () => {
        const response = await supertest(express).delete('/tasks/2').set('Authorization',`Bearer ${token}`).send();
        expect(response.text).toBe("task not found");
    })
});

describe("Update Task", () => {
    test("empty body", async () => {
        const response = await supertest(express).put('/tasks/2').set('Authorization',`Bearer ${token}`).send();
        expect(response.text).toBe("empty body");
    })
});
describe("Reading Specific Task", () => {
    test("Empty body", async () => {
        const response = await supertest(express).get('/tasks/2').set('Authorization',`Bearer ${token}`).send();
        expect(response.text).toBe("not found");
    })    
});
describe("Adding Task", () => {
    test("Empty body", async () => {
        const response = await supertest(express).post('/tasks/').set('Authorization',`Bearer ${token}`).send({
    });
        expect(response.text).toBe("empty body");
    })
});
describe("Update Task", () => {
    test("invalid data format", async () => {
        const response = await supertest(express).put('/tasks/1681293238692').set('Authorization',`Bearer ${token}`).send({
        "title" : "Title1",
        "description" : "some task",
        "priority" : "medium",
        "dueDate" : "28/05/2022",
        "taskComments" : "comment1"
        });
        expect(response.text).toBe("not found");
    })
});
describe("invalid data format", () => {
    test("", async () => {
        const response = await supertest(express).post('/tasks/').set('Authorization',`Bearer ${token}`).send({
            "title" : "Title1",
            "description" : "some task",
            "priority" : "medium",
            "dueDate" : "28/05/2022",
            "taskComments" : "comment1"
    });
        expect(response.text).toBe("invalid data or user");
    })
});