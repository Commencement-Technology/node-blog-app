const request = require("supertest");
const app = require("../src/app"); // Your Express app, assuming it's exported from app.js
const Comment = require("../src/models/Comment");
const jwt = require("jsonwebtoken");

jest.mock("../src/models/Comment");
jest.mock("jsonwebtoken");
jest.mock("../src/middlewares/verifyAuth", () => (req, res, next) => {
  req.user = { id: "user123" };
  next();
});

describe("Comments API", () => {
  let token;
  let userId = "user123";

  beforeEach(() => {
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  });

  describe("POST /comments", () => {
    it("should return 403 if user is not authorized", async () => {
      const res = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({
          content: "This is a comment",
          postId: "post123",
          userId: "wrongUserId",
        });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "You are not allowed to create this comment"
      );
    });

    it("should return 201 and create comment successfully", async () => {
      const mockComment = {
        content: "Test comment",
        postId: "post123",
        userId,
      };
      Comment.prototype.save.mockResolvedValue(mockComment);

      const res = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Test comment", postId: "post123", userId });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("success", true);
    });
  });

  describe("PUT /comments/:commentId", () => {
    it("should return 404 if comment not found", async () => {
      Comment.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/comments/comment123")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Updated comment" });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Comment not found");
    });

    it("should return 403 if user is not authorized to edit the comment", async () => {
      const mockComment = { userId: "anotherUserId" };
      Comment.findById.mockResolvedValue(mockComment);

      const res = await request(app)
        .put("/comments/comment123")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Updated comment" });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "You are not allowed to update this comment"
      );
    });

    it("should return 200 and update comment successfully", async () => {
      const mockComment = { userId, content: "Old comment" };
      Comment.findById.mockResolvedValue(mockComment);
      Comment.findByIdAndUpdate.mockResolvedValue({
        ...mockComment,
        content: "Updated comment",
      });

      const res = await request(app)
        .put("/comments/comment123")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Updated comment" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
    });
  });

  describe("GET /comments/:postId", () => {
    it("should return 200 and get all comments for a post", async () => {
      const mockComments = [
        { content: "Comment 1", postId: "post123", userId },
        { content: "Comment 2", postId: "post123", userId },
      ];
      Comment.find.mockResolvedValue(mockComments);

      const res = await request(app)
        .get("/comments/post123")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
    });
  });

  describe("DELETE /comments/:commentId", () => {
    it("should return 404 if comment not found", async () => {
      Comment.findById.mockResolvedValue(null);

      const res = await request(app)
        .delete("/comments/comment123")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Comment not found");
    });

    it("should return 403 if user is not authorized to delete the comment", async () => {
      const mockComment = { userId: "anotherUserId" };
      Comment.findById.mockResolvedValue(mockComment);

      const res = await request(app)
        .delete("/comments/comment123")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "You are not allowed to delete this comment"
      );
    });

    it("should return 200 and delete comment successfully", async () => {
      const mockComment = { userId };
      Comment.findById.mockResolvedValue(mockComment);
      Comment.findByIdAndDelete.mockResolvedValue(mockComment);

      const res = await request(app)
        .delete("/comments/comment123")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", "Comment has been deleted");
    });
  });

  describe("PUT /comments/like/:commentId", () => {
    it("should return 404 if comment not found", async () => {
      Comment.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/comments/like/comment123")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Comment not found");
    });

    it("should return 200 and update like status successfully", async () => {
      const mockComment = { likes: [], likeCount: 0, save: jest.fn() };
      Comment.findById.mockResolvedValue(mockComment);

      const res = await request(app)
        .put("/comments/like/comment123")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
    });
  });
});
