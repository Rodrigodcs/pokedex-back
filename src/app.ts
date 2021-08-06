import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonController";
import { authenticate } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());


app.post("/sign-up",userController.signUp)
app.post("/sign-in",userController.signIn)

app.use("/pokemons", authenticate)
app.get("/pokemons",pokemonController.getPokemons)

app.use("/my-pokemons", authenticate)
app.post("/my-pokemons/:id/add",pokemonController.addPokemon)
app.post("/my-pokemons/:id/remove",pokemonController.removePokemon)

export async function init () {
  await connectDatabase();
}

export default app;
