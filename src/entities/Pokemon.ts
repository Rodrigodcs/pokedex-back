import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import UserPokemon from "./UserPokemon";

@Entity("pokemons")
export default class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  image: string;

  @Column()
  weight: string;

  @Column()
  height: string;

  @Column()
  baseExp: number;

  @Column()
  description: string;

  // @Column()
  // inMyPokemons: boolean;

  @OneToMany(()=> UserPokemon,(userPokemon)=>userPokemon.pokemon)
  userPokemons: UserPokemon
}