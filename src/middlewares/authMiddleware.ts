import { Request, Response, NextFunction } from "express";

import * as userService from "../services/userService";

export async function authenticate(req:Request,res:Response,next:NextFunction){
  const header = req.header('Authorization')
  const token = header.split("Bearer ")[1]

  const user = await userService.autenticate(token)
  if(!user){
      return res.sendStatus(401)
  }else{
    res.locals.user = user
    next()
  }
}