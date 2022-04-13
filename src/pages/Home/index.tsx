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

const pokemonInicial =  [
    { id: 12, nome: 'bombassauro', img: 'ahduajmaidhda', },
    { id: 14, nome: 'bombassauro', img: 'ahduajmaidhda', }
]


interface pokeCard {
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

interface List {
    pokemon: number
}

 
export function Home() {
 
    const navigation = useNavigate()
    const [listId, setListId] = useState<[List]>()
    const listPokemon: 
        string | {
        id: number; 
        name: string; 
        img: URL; 
        weight: number; 
        experience: number; 
        height: number; }[] = []
    const [ Meupokemon, setMeuPokemon ] = React.useState<pokeCard>();
    const [ PokemonList, setPokemonList ] = React.useState<pokeList>();

    /*  Busca e retorna a lista de pokemons salvo no firebase referente ao usuário logado.
     *  Busca os pokemons referente a lista para setar no componente LIST.     */

    useEffect (() => {
        const myId: string | number = auth.currentUser?.uid;

        var listCountPoke = firebase.database().ref('pokedex/').orderByChild('idUser').equalTo(myId)
        try {
                listCountPoke.on('value', (snapshot) => {
 
                const list: {
                    pokemon: object
                }[] = [] 
    
                snapshot.forEach(childItem => { 
                    list.push ({
                        pokemon: childItem.val().pokemon  
                    })                  
                });
                setListId(list)  
            });
        } catch (error) {
            alert('404!')
        }

        let i = 0

        if (listId != null) {
            const xLength:number = listId.length

            while (i < xLength) { 
                const endpoint = `https://pokeapi.co/api/v2/pokemon/${listId[i].pokemon}/`;
                const idPokemon = listId[i].pokemon
    
                fetch(endpoint)
                   .then(resposta => resposta.json())
                       .then ( json => {
                           const pokemonSearch = {
                               id: idPokemon,
                               name: json.name,
                               img: json.sprites.other["official-artwork"].front_default,
                               weight: json.weight,
                               experience: json.base_experience,
                               height: json.height
                           };   
                           
                           listPokemon.push(pokemonSearch)           
                       })
                       .catch( () => {
                           alert('Não foi carregar o poke!');
                   });
                i = i + 1;
            }
        } else { 
            alert('você ainda não tem nenhum pokemon!')
        }
        setPokemonList(listPokemon)
        console.log('listpokemon' , listPokemon)
        console.log('deu certo? ', PokemonList)
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
                            {PokemonList.map((pokemon: { id: number; img: URL; name: string; weight: number; experience: number; height: number; }) => (
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
                                                <h1>Leo</h1>
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