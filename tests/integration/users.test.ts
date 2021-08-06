import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser, createUserBody } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  it("should answer with status 201", async () => {
    const body = createUserBody();

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(201);
  });

  it("should answer with status 400 with invalid email", async () => {
    const body = createUserBody();

    body.email="test"

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(400);
  });
  it("should answer with status 400 if passwords does not match", async () => {
    const body = createUserBody();

    body.confirmPassword="test"

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(400);
  });
  it("should answer with status 409 if email already registered", async () => {
    const user= await createUser();
    const body = createUserBody();

    body.email=user.email

    const response = await supertest(app).post("/sign-up").send(body);

    expect(response.status).toBe(409);
  });
});

describe("POST /sign-in", () => {
  it("should answer with status 200", async () => {
    const user = await createUser();

    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(200);
  });
  it("should answer with status 400 with invalid email", async () => {
    const user = await createUser();

    user.email="test"

    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(400);
  });
  it("should answer with status 401 if email incorrect", async () => {
    const user = await createUser();

    user.email = "teste@test.com"

    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(401);
  });
  it("should answer with status 401 if password incorrect", async () => {
    const user = await createUser();

    user.password = "123"

    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(401);
  });
});

// describe("POST /sign-up", () => {
//   it("should answer with text \"OK!\" and status 200", async () => {
//     const body = await createUserBody();

//     const response = await supertest(app).post("/sign-up");
    
//     expect(response.body).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           email: user.email
//         })
//       ])
//     );

//     expect(response.status).toBe(200);
//   });
// });