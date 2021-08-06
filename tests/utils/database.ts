import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";
import Pokemon from "../../src/entities/Pokemon";
import UserPokemon from "../../src/entities/UserPokemon";

export async function clearDatabase () {
  await getRepository(UserPokemon).delete({});
  await getRepository(Session).delete({});
  await getRepository(User).delete({});
  await getRepository(Pokemon).delete({});
  
}
