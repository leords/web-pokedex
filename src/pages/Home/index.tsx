import React, { useEffect, useReducer, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../service/firebase";
import firebase from "firebase/compat";

import styles from "./styles.module.scss";

import { PokeCard } from "../../component/PokeCard";

import pokemonLogo from "../../assets/pokemon-logo.png";
import Map from "../../assets/icones/mapa.png";
import Logo from "../../assets/icones/logo.png";

interface pokeCard {
    id: number,
    name: string
    img: URL
    weight: number
    experience: number
    height: number
}

interface pokeList {
    [x: string]: any;
    id: number,
    name: string
    img: URL
    weight: number
    experience: number
    height: number
} 

 
export function Home() {
 
    const navigation = useNavigate()

    var listIdFromFireBase: { 
        id:number,
        name: string
        img: URL
        weight: number
        experience: number
        height: number 
    }[] = [];

    const [ Meupokemon, setMeuPokemon ] = React.useState<pokeCard>();
    const [ PokemonList, setPokemonList ] = React.useState<pokeList>();

    /*  Busca e retorna a lista de pokemons salvo no firebase referente ao usuário logado. */

    useEffect (() => {
        async function getListIdPokemon() {
            try {
                const myId: string | number = auth.currentUser?.uid;
    
                var listCountPoke = await firebase.database().ref('pokedex/').orderByChild('idUser').equalTo(myId)
                
                listCountPoke.on('value', (snapshot) => {
    
                if (snapshot == null) {
                    alert('Você está com a pokedex vázia.')
                } else {
                    snapshot.forEach(childItem => { 
                        listIdFromFireBase.push ({ 
                            id: childItem.val().id,
                            name: childItem.val().name,
                            img: childItem.val().img,
                            weight: childItem.val().weight,
                            experience: childItem.val().experience,
                            height: childItem.val().height
                        })                  
                    }); 
                }        
                setPokemonList(listIdFromFireBase)
                });
            } catch (error) {   
            }
        }

        getListIdPokemon()

    }, [])

    // Faz o Logout do usuário.
    const singOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation('/')
            alert('Você se desconectou!')  
        }).catch((error) => { 
        // An error happened.
        });
    }

    // Busca o pokemon para setar no componente CARD.
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
                    console.log('Poke')

                    setMeuPokemon(pokemonSearch)
                })
                .catch( () => {
                    alert('Não foi carregar o poke!');
            });
    } 

    return(
        <div className={styles.container}>
            <div className={styles.header}> 
                <div className={styles.logoHeader}>
                    <img src={pokemonLogo} alt="" />
                </div>
                <div className={styles.buttonHeader}>
                    <h1>Olá, {auth.currentUser?.email}</h1>
                    <button onClick={singOut}> SAIR </button>
                </div> 
            </div>
            
            <div className={styles.bodyPokedex}>
                <div className={styles.perfilPokemon}>

                    {Meupokemon != null && (
                        <PokeCard 
                        photo = {Meupokemon?.img} 
                        name = {Meupokemon?.name}
                        weight = {Meupokemon?.weight}
                        height = {Meupokemon?.height}
                        experience = {Meupokemon?.experience}
                        />
                    )}

                    {Meupokemon == null && (
                        <div className={styles.containerNull}>
                            <img src={Logo} alt="" />
                        </div>
                    )}

                </div>

                <div className={styles.listPokemon}>
                    <div className={styles.imageLogo}> 
                        <h1>MEUS POKEMONS</h1> 
                    </div> 

                    {PokemonList != null && (
                        <ul className={styles.list}>

                            {PokemonList.map((pokemon: {id:number, img: URL, name: string})=> (
                                <li 
                                key={pokemon.id}
                                className={styles.listPoke}
                                onClick={() => getPokemonData(pokemon.id)} 
                                >
                                    <div className={styles.poke}>
                                        <div className={styles.imagePoke}>
                                            <img src={pokemon.img}  alt="" />
                                        </div>
                                        <div className={styles.infoPoke}> 
                                            <h1>{pokemon.name}</h1> 
                                        </div>
                                    </div>
                                </li>
                            ))}

                        </ul> 
                    )}  

                    {PokemonList == null && (
                        <h1>Pokedex Vázia</h1>
                    )}

                    <Link 
                    className={styles.hunt} 
                    to={'/hunt'}
                    >
                        <h1>ENCONTRAR NOVOS POKEMONS!</h1> 
                        <img src={Map} alt="" />
                    </Link>

                </div>
            </div>
        </div>
    )
}