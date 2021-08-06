import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createPokemon } from "../factories/pokemonFactory";
import { userSignIn } from "../factories/userFactory";
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

describe("POST /pokemons", () => {
  it("should answer with status 200", async () => {
    const session = await userSignIn()
    await createPokemon()

    const response = await supertest(app).get("/pokemons").set('Authorization', `Bearer ${session.token}`)

    expect(response.status).toBe(200);
  });
});

describe("POST /my-pokemons/:id/add", () => {
    it("should answer with status 200", async () => {
      const session = await userSignIn()
      const pokemon = await createPokemon()
  
      const response = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer ${session.token}`)
  
      expect(response.status).toBe(200);
    });
    it("should answer with status 401 for invalid token", async () => {
      const session = await userSignIn()
      const pokemon = await createPokemon()
      
      const invalidToken = "test"
      const response = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer ${invalidToken}`)
  
      expect(response.status).toBe(401);
    });
    it("should answer with status 406 when trying to add an already added pokemon", async () => {
      const session = await userSignIn()
      const pokemon = await createPokemon()

      await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer ${session.token}`)
      const response = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer ${session.token}`)
  
      expect(response.status).toBe(406);
    });
});

describe("POST /my-pokemons/:id/remove", () => {
    it("should answer with status 200", async () => {
      const session = await userSignIn()
      const pokemon = await createPokemon()
  
      await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer ${session.token}`)
      const response = await supertest(app).post(`/my-pokemons/${pokemon.id}/remove`).set('Authorization', `Bearer ${session.token}`)
  
      expect(response.status).toBe(200);
    });
    it("should answer with status 401 when token invalid", async () => {
      const session = await userSignIn()
      const pokemon = await createPokemon()

      const invalidToken = "test"
  
      await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('Authorization', `Bearer ${session.token}`)
      const response = await supertest(app).post(`/my-pokemons/${pokemon.id}/remove`).set('Authorization', `Bearer ${invalidToken}`)
  
      expect(response.status).toBe(401);
    });
    it("should answer with status 406 if trying to remove not added pokemon", async () => {
      const session = await userSignIn()
      const pokemon = await createPokemon()

      const invalidToken = "test"
  
      const response = await supertest(app).post(`/my-pokemons/${pokemon.id}/remove`).set('Authorization', `Bearer ${session.token}`)
  
      expect(response.status).toBe(406);
    });
});