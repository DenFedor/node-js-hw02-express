require("dotenv").config();
const app = require("../../app");
const testReq = require("supertest");
const mongoose = require("mongoose");

const { DB_HOST_TEST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST_TEST)
      .then(() => console.log("DB Connected"))
      .catch((err) => {
        console.log(err);
      });
  });

  it("should login user with valid credentials", async () => {
    const response = await testReq(app).post("/api/auth/users/login").send({
      email: "usertest@gmail.com",
      password: "1234567890",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');

    expect(response.body.user).toEqual(expect.objectContaining({email:expect.any(String),subscription:expect.any(String)}))
    expect(response.body.token).toEqual(expect.any(String));
  });

    it('shoud not login user with wrong email', async () => {
      await testReq(app).post('/api/auth/users/login').send({
        email: 'usertestwrong@gmail.com',
        password: '1234567890',
      })

      const response = await testReq(app).post('/api/auth/users/login').send({
        email: 'usertestwrong@gmail.com',
        password: '1234567890',
      })
      expect(response.statusCode).toBe(401)
      expect(response.body.message).toBe('Email or password is wrong')
    })
    it('shoud not login user with wrong password', async () => {
        await testReq(app).post('/api/auth/users/login').send({
          email: 'usertest@gmail.com',
          password: 'wrongpassword',
        })
  
        const response = await testReq(app).post('/api/auth/users/login').send({
          email: 'usertest@gmail.com',
          password: 'wrongpassword',
        })
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe('Email or password is wrong')
      })

  afterAll(async () => {
    await mongoose
      .disconnect(DB_HOST_TEST)
      .then(() => console.log("DB Disconnected"))
      .catch((err) => {
        console.log(err);
      });
  });
});
