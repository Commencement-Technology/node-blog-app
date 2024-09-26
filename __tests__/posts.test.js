const request = require("supertest");
const app = require("../src/app");
const Post = require("../src/models/Post");
const jwt = require("jsonwebtoken");

jest.mock("../src/models/Post");
jest.mock("jsonwebtoken");
jest.mock("../src/middlewares/verifyAuth", () => (req, res, next) => {
  req.user = { id: "user123" };
  next();
});

describe("Posts API", () => {
  let token;
  let userId = "user123";

  beforeEach(() => {
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  });

  describe("POST /posts", () => {
    it("should return 403 if user is not authorized to create a post", async () => {
      const res = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "My First Post",
          content: "Content of the first post",
          image: "http://example.com/image.jpg",
          category: "Technology",
          userId: "wrongUserId",
        });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "You are not allowed to create this post"
      );
    });

    it("should return 201 and create a post successfully", async () => {
      const mockPost = {
        title: "Test Post",
        content: "This is a test post",
        image: "http://example.com/image.jpg",
        category: "Technology",
        userId,
      };
      Post.prototype.save.mockResolvedValue(mockPost);

      const res = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Post",
          content: "This is a test post",
          image: "http://example.com/image.jpg",
          category: "Technology",
          userId,
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", "Post created successfully!");
    });
  });

  describe("PUT /posts/:postId", () => {
    it("should return 404 if post not found", async () => {
      Post.findById.mockResolvedValue(null);

      const res = await request(app)
        .put("/posts/post123")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Title",
          content: "Updated Content",
        });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Post not found");
    });

    it("should return 403 if user is not authorized to update the post", async () => {
      const mockPost = { userId: "anotherUserId" };
      Post.findById.mockResolvedValue(mockPost);

      const res = await request(app)
        .put("/posts/post123")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Title",
          content: "Updated Content",
        });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "You are not allowed to update this post"
      );
    });

    it("should return 200 and update post successfully", async () => {
      const mockPost = { userId, title: "Old Post", content: "Old Content" };
      Post.findById.mockResolvedValue(mockPost);
      Post.findByIdAndUpdate.mockResolvedValue({
        ...mockPost,
        title: "Updated Title",
        content: "Updated Content",
      });

      const res = await request(app)
        .put("/posts/post123")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Title",
          content: "Updated Content",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", "Post updated successfully!");
    });
  });

  describe("GET /posts", () => {
    it("should return 200 and get all posts", async () => {
      const mockPosts = [
        { title: "Post 1", content: "Content of post 1", userId },
        { title: "Post 2", content: "Content of post 2", userId },
      ];
      Post.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockPosts),
      });

      Post.countDocuments.mockResolvedValue(2);

      const res = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.posts).toHaveLength(2);
    });
  });

  describe("DELETE /posts/:postId/:userId", () => {
    it("should return 404 if post is not found", async () => {
      Post.findById.mockResolvedValue(null);

      const res = await request(app)
        .delete("/posts/post123/user123")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty("message", "Post not found");
    });

    it("should return 403 if user is not authorized to delete the post", async () => {
      const mockPost = { userId: "anotherUserId" };
      Post.findById.mockResolvedValue(mockPost);

      const res = await request(app)
        .delete("/posts/post123/anotherUserId")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body).toHaveProperty(
        "message",
        "You are not allowed to delete this post"
      );
    });

    it("should return 200 and delete post successfully", async () => {
      const mockPost = { userId };
      Post.findById.mockResolvedValue(mockPost);
      Post.findByIdAndDelete.mockResolvedValue(mockPost);

      const res = await request(app)
        .delete("/posts/post123/user123")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", "The post has been deleted");
    });
  });
});
