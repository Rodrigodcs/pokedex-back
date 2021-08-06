import { Request, Response } from "express";
import joi from "joi"

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
  try {
    const validate = signUpSchema.validate(req.body)
    if(validate.error){
      return res.sendStatus(400)
    }
    const {email,password,confirmPassword}=req.body as {email:string;password:string;confirmPassword:string}
    if(password!==confirmPassword){
      return res.sendStatus(400)
    }
    const create = await userService.signUp(email,password);
    if(!create){
      return res.sendStatus(409)
    }
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function signIn (req: Request, res: Response) {
  try {
    const validate = signInSchema.validate(req.body)
    if(validate.error){
      return res.sendStatus(400)
    }
    const {email,password}=req.body as {email:string;password:string}
    const token = await userService.signIn(email,password);
    if(!token){
      return res.sendStatus(401)
    }
    res.send({token});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required()
})

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
})
