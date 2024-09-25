const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

jest.mock("../src/models/User");
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");

describe("Auth Controller", () => {
  describe("POST /login", () => {
    it("should return 400 if user does not exist", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post("/login")
        .send({ email: "test@mail.com", password: "password123" });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });

    it("should return 400 if password is incorrect", async () => {
      const mockUser = { email: "test@mail.com", password: "hashedPassword" };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app)
        .post("/login")
        .send({ email: "test@mail.com", password: "wrongPassword" });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });

    it("should return 200 and a token if login is successful", async () => {
      const mockUser = {
        _id: "123",
        email: "test@mail.com",
        password: "hashedPassword",
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "fakeToken");
      });

      const res = await request(app)
        .post("/login")
        .send({ email: "test@mail.com", password: "password123" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("token", "fakeToken");
    });
  });

  describe("POST /register", () => {
    it("should return 400 if user already exists", async () => {
      User.findOne.mockResolvedValue({ email: "test@mail.com" });

      const res = await request(app).post("/register").send({
        username: "testuser",
        email: "test@mail.com",
        password: "password123",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "User already exists");
    });

    it("should return 201 and a token if registration is successful", async () => {
      User.findOne.mockResolvedValue(null);
      const mockUser = {
        _id: "123",
        email: "test@mail.com",
        password: "hashedPassword",
      };
      User.prototype.save.mockResolvedValue(mockUser);
      jwt.sign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "fakeToken");
      });

      const res = await request(app).post("/register").send({
        username: "testuser",
        email: "test@mail.com",
        password: "password123",
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("token", "fakeToken");
    });
  });
});
