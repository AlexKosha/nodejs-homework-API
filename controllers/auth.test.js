const app = require("../app");
const request = require("supertest");
const { describe, test, expect } = require("@jest/globals");

describe("POST /api/users/login", () => {
  test("should return status code 200 and token with user object", async () => {
    const userData = {
      email: "alex@gmail.com",
      password: "1234567",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(200);

    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user).toHaveProperty("subscription");
    expect(typeof response.body.token).toBe("string");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
