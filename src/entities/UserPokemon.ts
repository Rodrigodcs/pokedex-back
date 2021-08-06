import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User"
import Pokemon from "./Pokemon"

@Entity("usersPokemons")
export default class UserPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  pokemonId: number;

  @ManyToOne(()=> User, (user)=> user.userPokemons)
  user:User

  @ManyToOne(()=> Pokemon, (pokemon)=> pokemon.userPokemons)
  pokemon:Pokemon
}