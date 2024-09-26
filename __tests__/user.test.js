const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../src/models/User");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../src/middlewares/verifyAuth", () => (req, res, next) => {
  req.user = { id: "user123" };
  next();
});

describe("User API", () => {
  let token;
  const userId = "user123";

  beforeEach(() => {
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    jest.clearAllMocks();
  });

  describe("PUT /users/:userId", () => {
    it("should return 403 if user is not authorized to update", async () => {
      const res = await request(app)
        .put("/users/wrongUserId")
        .set("Authorization", `Bearer ${token}`)
        .send({ username: "newUsername" });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "You are not allowed to update this user"
      );
    });

    it("should return 404 if user is not found", async () => {
      User.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app)
        .put(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ username: "newUsername" });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should return 200 and update the user successfully", async () => {
      const mockUser = { username: "newUsername", email: "user@example.com" };
      User.findByIdAndUpdate.mockResolvedValue(mockUser);

      const res = await request(app)
        .put(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ username: "newUsername" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", "User updated successfully");
      expect(res.body.updatedUser).toHaveProperty("username", "newUsername");
    });
  });

  describe("DELETE /users/:userId", () => {
    it("should return 404 if user is not found", async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should return 200 and delete user successfully", async () => {
      User.findByIdAndDelete.mockResolvedValue({});

      const res = await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", "User deleted successfully");
    });
  });

  describe("GET /users/:userId", () => {
    it("should return 404 if user is not found", async () => {
      User.findById.mockResolvedValue(null);

      const res = await request(app)
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should return 200 and get user successfully", async () => {
      const mockUser = { username: "user123", email: "user@example.com" };
      User.findById.mockResolvedValue(mockUser);

      const res = await request(app)
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", "Getting user successfully");
      expect(res.body.user).toHaveProperty("username", "user123");
      expect(res.body.user).toHaveProperty("email", "user@example.com");
    });
  });
});
