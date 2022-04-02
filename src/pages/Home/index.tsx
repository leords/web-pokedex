import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../service/firebase";

import styles from "./styles.module.scss";

import logo from "../../assets/icones/pokedex.png";
import pokemonPhoto from "../../assets/charizard.png";
import pokemonLogo from "../../assets/pokemon-logo.png";
import Map from "../../assets/icones/mapa.png";

const pokemonIniciais = [
    {id: 1, nome: "Bulbasauro", peso: 10},
    {id: 4, nome: "Charmander", peso: 12},
    {id: 7, nome: "Squirtle", peso: 15}
];

type pokeCard = {
    name: String
    img: URL
    weight: number
    experience: number
    height: number
}



export function Home() {


    const navigation = useNavigate()

    const singOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation('/')
            alert('Você se desconectou!')
        }).catch((error) => {
        // An error happened.
        });
    }

    //const serviceOuthOff = new firebaseService();

    
    //const UserOff = (() => {
    //    serviceOuthOff.singOut();
    //    alert('Você se desconectou!');
    //})

    const [ Meupokemon, setMeuPokemon ] = React.useState<pokeCard>();

    const getPokemonData = (idPokemon: number) => {
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

         fetch(endpoint)
            .then(resposta => resposta.json())
                .then ( json => {
                    const pokemonSearch = {
                        name: json.name,
                        img: json.sprites.other["official-artwork"].front_default,
                        weight: json.weight,
                        experience: json.base_experience,
                        height: json.height
                    };
                    console.log('Poke', pokemonSearch)

                    setMeuPokemon(pokemonSearch)
                })
                .catch( () => {
                    alert('Não foi carregar o poke!');
            });
    }

    

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Olá, {auth.currentUser?.email}</h1>
                <img src={pokemonLogo} alt="" />
                <button onClick={singOut}> SAIR </button>
            </div>

            <div className={styles.bodyPokedex}>
                <div className={styles.perfilPokemon}>
                    <div className={styles.cardPoke}>
                        <div className={styles.image}>
                            <img src={Meupokemon?.img} alt="" />
                        </div>
                        <div className={styles.tittleCard}>
                            <h1>{Meupokemon?.name}</h1>
                        </div>
                        <div className={styles.description}>
                            <p>Peso: {Meupokemon?.weight}</p>
                            <p>Altura: {Meupokemon?.height}</p>
                            <p>Experiência: {Meupokemon?.experience}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.listPokemon}>
                    <div className={styles.imageLogo}>
                        <img src={logo} alt="" />
                        <h1>POKEDEX</h1>
                    </div>
                    <div className={styles.tittle}>
                        <p>Meus Pokemons</p>
                    </div>
                    <ul className={styles.list}>
                        {pokemonIniciais.map( pokemon => (
                        <li 
                        className={styles.listPoke}
                        onClick={() => getPokemonData(pokemon.id)}
                        >
                            <div className={styles.poke}>
                                <div className={styles.imagePoke}>
                                    <img src={pokemonPhoto} alt="" />
                                </div>
                                <div className={styles.infoPoke}>
                                    <h1>{pokemon.nome}</h1>
                                    <p>{pokemon.peso}</p>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    <Link 
                    className={styles.hunt}
                    to={''}
                    
                    >
                        <img src={Map} alt="" />
                        <h1>Caçar Pokemons!</h1> 
                    </Link>
                </div>

            </div>
        </div>
    )
}