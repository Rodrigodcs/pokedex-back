import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons (req: Request, res: Response) {
    try {
        const pokemons = await pokemonService.getPokemons(res.locals.user.id)

        res.send(pokemons);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function addPokemon (req: Request, res: Response) {
    try {
        const pokemonId = parseInt(req.params.id)
        const response = await pokemonService.addPokemon(res.locals.user.id,pokemonId)
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
        const pokemonId = parseInt(req.params.id)

        const response = await pokemonService.removePokemon(res.locals.user.id,pokemonId)
        
        if(!response){
            return res.sendStatus(406)
        }
        res.sendStatus(200)
        
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}