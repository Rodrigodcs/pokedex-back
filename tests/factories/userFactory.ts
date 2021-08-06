import { getRepository } from "typeorm";
import faker from "faker"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

export function createUserBody () {
  const password = faker.internet.password();
  const userBody ={
    email: faker.internet.email(),
    password,
    confirmPassword:password
  }

  return userBody;
}

export async function createUser () {
  const user ={
    email: faker.internet.email(),
    password:faker.internet.password()
  }

  const userSaved = await getRepository(User).create({
    email: user.email,
    password: bcrypt.hashSync(user.password,10)
  });

  await getRepository(User).save(userSaved);

  return user;
}

export async function userSignIn(){
  await createUser()

  const user = await getRepository(User).findOne()

  const token = uuid();

  const session = await getRepository(Session).create({
    userId:user.id,
    token
  });
  await getRepository(Session).save(session)
  return session
}
