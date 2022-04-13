import React, { useEffect, useState } from "react";
import firebase from "firebase/compat";
import { auth } from "../../service/firebase";

import pokemonLogo from "../../assets/pokemon-logo.png";
import get from "../../assets/icones/get.png";

import { PokeCard } from "../../component/PokeCard";

import styles from './styles.module.scss';

//Lista de pokemon salvo para evitar a repetição do mesmo pokemon no momento de encontrar novos poke;
const listHunt: number[] = [];

// tipagem para Pokecard!
type pokeCard = {
    name: string
    img: URL
    weight: number
    experience: number
    height: number
}

export function PokeHunt() {

    const [huntPokemon, setHuntPokemon] = React.useState<pokeCard>();


    // Função que retorna a busca de pokemon dentro da PokeApi por ID gerado aleatóriamente por um random.
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

// função que salva o pokemon escolhido na base de dados firebase.   
    const writeUserData = () => {
        const idPoke = listHunt[listHunt.length-1]

        var postListRef = firebase.database().ref('pokedex/');
        var newPostRef = postListRef.push();
        newPostRef.set({ 
            idUser: auth.currentUser?.uid,
            id: idPoke,
            name: huntPokemon?.name,
            img: huntPokemon?.img,
            weight: huntPokemon?.weight,
            experience: huntPokemon?.experience,
            height: huntPokemon?.height
        });
        
        getPokemonData
        alert('Você capturou o pokemon: ' + huntPokemon?.name)
    }


    return(
        <div className={styles.container}>
            <div className={styles.header}>
                 <img src={pokemonLogo} alt="" />
            </div>
            <div className={styles.camp}>
                <div className={styles.containerList}>
                    <div className={styles.listCard}>
                        {huntPokemon != null && (
                            <PokeCard 
                            photo = {huntPokemon?.img}
                            name = {huntPokemon?.name}
                            height = {huntPokemon?.height}
                            weight = {huntPokemon?.weight}
                            experience = {huntPokemon?.experience}
                            />
                        )}
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