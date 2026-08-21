import request from "supertest";
import { jest } from "@jest/globals";

const userModel = {
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
};

jest.unstable_mockModule("../src/models/user.model.js", () => userModel);
jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn().mockResolvedValue("hashed-password"),
    compare: jest.fn(),
  },
}));

process.env.JWT_SECRETKEY = "test-secret";
process.env.CORS_ORIGIN = "http://localhost:5173";

const { default: app } = await import("../src/app.js");
const { default: bcrypt } = await import("bcrypt");
const { User } = userModel;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Auth API", () => {
  test("POST /api/auth/register rejects invalid input", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "x", email: "bad-email", password: "weak", role: "Guest" });

    expect(response.status).toBe(400);
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(User.findOne).not.toHaveBeenCalled();
  });

  test("POST /api/auth/register creates a user", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: "user-id", role: "Visitor" });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: "expo_user",
        email: "PERSON@example.com",
        password: "Strong1!",
        role: "Visitor",
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
    expect(User.create).toHaveBeenCalledWith({
      username: "expo_user",
      email: "person@example.com",
      password: "hashed-password",
      role: "Visitor",
    });
  });

  test("POST /api/auth/login rejects missing credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ identifier: "", password: "short" });

    expect(response.status).toBe(400);
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(User.findOne).not.toHaveBeenCalled();
  });

  test("POST /api/auth/login returns 401 for an unknown user", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/auth/login")
      .send({ identifier: "person@example.com", password: "Strong1!" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("invalid email or password");
  });

  test("POST /api/auth/login returns the user's role for valid credentials", async () => {
    User.findOne.mockResolvedValue({
      _id: "user-id",
      role: "Exhibitor",
      password: "hashed-password",
    });
    bcrypt.compare.mockResolvedValue(true);

    const response = await request(app)
      .post("/api/auth/login")
      .send({ identifier: "PERSON@example.com", password: "Strong1!" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "logged in successfully",
      role: "Exhibitor",
    });
    expect(response.headers["set-cookie"]).toBeDefined();
  });
});