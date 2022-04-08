import React, { useEffect, useState } from "react";
import firebase from "firebase/compat";
import { auth } from "../../service/firebase";

import pokemonLogo from "../../assets/pokemon-logo.png";
import get from "../../assets/icones/get.png";

import { PokeCard } from "../../component/PokeCard";

import styles from './styles.module.scss';


const listHunt: number[] = [];

type pokeCard = {
    id: number
    name: String
    img: URL
    weight: number
    experience: number
    height: number
}

export function PokeHunt() {

    const [huntPokemon, setHuntPokemon] = React.useState<pokeCard>();


// Função buscando pokemon com numeros aleatórios
    const getPokemonData = () => {

        const random = Math.floor(Math.random() * 100) + 1;
        // condição que garante que o pokemon não seja listado mais que uma vez na procura do usuário.
        while (listHunt.indexOf(random) < 0) {

            listHunt.push(random);
            const endpoint = `https://pokeapi.co/api/v2/pokemon/${random}/`;

            fetch(endpoint)
            .then(resposta => resposta.json())
                .then ( json => {
                    const pokemonSearch = {
                        id: random,
                        name: json.name,
                        img: json.sprites.other["official-artwork"].front_default,
                        weight: json.weight,
                        experience: json.base_experience,
                        height: json.height
                    };
                    setHuntPokemon(pokemonSearch)
                })
                .catch( () => {
                    alert('Não foi carregar o poke!');
                });
        }
        } 
    
    const writeUserData = () => {
        const idPoke = listHunt[listHunt.length-1]

        var postListRef = firebase.database().ref('user/' + auth.currentUser?.uid + '/pokedex');
        var newPostRef = postListRef.push();
        newPostRef.set({
            pokemon: idPoke
        });
        
        getPokemonData
        alert('Passoou')
    }


    return(
        <div className={styles.container}>
            <div className={styles.header}>
                 <img src={pokemonLogo} alt="" />
            </div>
            <div className={styles.camp}>
                <div className={styles.containerList}>
                    <div className={styles.listCard}>
                        <PokeCard 
                            photo={huntPokemon?.img}
                            name={huntPokemon?.name}
                            height= {huntPokemon?.height}
                            weight={huntPokemon?.weight}
                            experience={huntPokemon?.experience}
                        />
                    </div>
                    <div className={styles.containerButtonPlus}>
                        <button onClick={getPokemonData} > 
                            <h1>+</h1>
                         </button>
                    </div>
                    <div className={styles.containerButtonGet}>
                        <img 
                        src={get}
                        alt=""
                        onClick={() => writeUserData()}
                        />
                    </div>
                    <div className={styles.containerDescription}>
                        <h1>CAPTURAR</h1>
                    </div>
                </div>
            </div>
        </div>
    );
    }