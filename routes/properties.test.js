"use strict";

const request = require("supertest");

const app = require("../app");

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

const testJobIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM properties");
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /companies */
describe("POST /properties", function () {
  test("works for admins: create admin", async function () {
    
    let resp = await request(app)
        .post("/auth/register")
        .send({
          username: "u-new",
          firstName: "First-new",
          lastName: "Last-newL",
          password: "password-new",
          email: "new@gmail.com",
          isAdmin: true,
        })
        
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
       token: expect.any(String),
    });

    //login this user
    resp = await request(app)
    .post("/auth/token")
    .send({
      username: "u-new",
      password: "password-new"
    })
    expect(resp.statusCode).toEqual(200);
    let myToken = resp.body.token;
 
    //Add properties 
    const newProperty = {
          street: "11491 Trillium Court",
          state: "CA",
          city: "San Diego",
          zip: 92131,
          property_type: 1,
          cost: 35,
          description: "Big Yard",
          property_owner: "u-new"
      };
         
      resp = await request(app)
              .post("/property/u-new")
              .send(newProperty)
              .set("authorization", `Bearer ${myToken}`);
          expect(resp.statusCode).toEqual(200);
          
  });
  
});

