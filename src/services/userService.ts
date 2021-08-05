import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

import User from "../entities/User";
import Session from "../entities/Session";

export async function signUp (email:string,password:string): Promise<boolean> {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({email})
  if(user){
    return false
  }
  const hashedPassword = bcrypt.hashSync(password,10)
  await userRepository.insert({email,password:hashedPassword})
  return true
}

export async function signIn (email:string,password:string): Promise<string> {
  const userRepository = getRepository(User)
  const sessionRepository = getRepository(Session)
  const user = await userRepository.findOne({email})
  if(!user){
    return null
  }
  if(!bcrypt.compareSync(password,user.password)){
    return null
  }
  const token = uuid();
  await sessionRepository.insert({userId:user.id,token})
  return token
}
