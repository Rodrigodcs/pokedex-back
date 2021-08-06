import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";
import * as userService from "../services/userService";


export async function getPokemons (req: Request, res: Response) {
    try {
        const header = req.header('Authorization')
        const token = header.split("Bearer ")[1]

        const user = await userService.autenticate(token)
        if(!user){
            return res.sendStatus(401)
        }

        const pokemons = await pokemonService.getPokemons(user.id)

        res.send(pokemons);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function addPokemon (req: Request, res: Response) {
    try {
        
        const header = req.header('Authorization')
        const token = header.split("Bearer ")[1]

        const user = await userService.autenticate(token)
        if(!user){
            return res.sendStatus(401)
        }

        const pokemonId = parseInt(req.params.id)

        const response = await pokemonService.addPokemon(user.id,pokemonId)
        if(response){
            return res.sendStatus(406)
        }
        res.sendStatus(200)

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function removePokemon (req: Request, res: Response) {
    try {
        const header = req.header('Authorization')
        const token = header.split("Bearer ")[1]

        const user = await userService.autenticate(token)
        if(!user){
            return res.sendStatus(401)
        }

        const pokemonId = parseInt(req.params.id)

        const response = await pokemonService.removePokemon(user.id,pokemonId)
        console.log(response)
        if(!response){
            return res.sendStatus(406)
        }
        res.sendStatus(200)
        
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}