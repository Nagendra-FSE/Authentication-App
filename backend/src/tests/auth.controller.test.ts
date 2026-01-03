import request from "supertest";
import { jest } from "@jest/globals";

// import AuthService from "../service/auth.service.js";

import { CREATED } from "../constants/http.js";
import { createTestApp } from "./setupTestApp.js";

jest.mock("../service/auth.service", () => {
  return {
    default: jest.fn()   // 👈 THIS IS CRITICAL
  };
});
jest.mock("../utils/cookies.js");
const setAuthCookies = jest.fn();
const AuthService = jest.fn()
const AuthServiceMock = AuthService as jest.MockedClass<typeof AuthService>;

describe("POST /auth/register", () => {
  const app = createTestApp();

  beforeEach(() => {
    
    AuthServiceMock.mockImplementation(() => ({
      createAccount: jest.fn<() => Promise<any>>().mockResolvedValue({
        newUser: {
          _id: "userId",
          email: "test@example.com",
          verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        verificationCode: {} as any,
        refreshToken: "mockRefreshToken",
        accessToken: "mockAccessToken"
      })
    } as any));

    setAuthCookies.mockImplementation((res) => res);
  });

  it("should register a user and return 201", async () => {
    const response = await request(app)
      .post("/auth/register")
      .set("User-Agent", "jest-test-agent")
      .send({
        status: CREATED
      });

    // 🔹 Assertions
    expect(response.status).toBe(CREATED);

    expect(response.body).toEqual({
      user: expect.objectContaining({
        email: "test@example.com"
      }),
      message: "User registered successfully",
      token: "mockAccessToken"
    });

    expect(AuthServiceMock.prototype.createAccount).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      userAgent: "jest-test-agent"
    });

    expect(setAuthCookies).toHaveBeenCalled();
  });
});
