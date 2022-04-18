import React, { Children, useEffect, useReducer, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { auth } from "../../service/firebase";
import firebase from "firebase/compat";

import styles from "./styles.module.scss";

import { PokeCard } from "../../component/PokeCard";

import pokemonLogo from "../../assets/pokemon-logo.png";
import Map from "../../assets/icones/mapa.png";
import Logo from "../../assets/icones/logo.png";
import Pokedex from "../../assets/icones/Pokedex.png";
import Treiner from "../../assets/icones/treinador.png";
import Logout from "../../assets/icones/logout.png";
import Delete from "../../assets/icones/delete.png";

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
    key: string,
    id: number,
    name: string
    img: URL
    weight: number
    experience: number
    height: number
} 

 
export function Home() {
 
    const navigation = useNavigate()

    const [ Meupokemon, setMeuPokemon ] = React.useState<pokeCard>();
    const [ PokemonList, setPokemonList ] = React.useState<pokeList>();
    const [ idPoke, setIdPoke ] = useState('')

    /*  Busca e retorna a lista de pokemons salvo no firebase referente ao usuário logado. */
    useEffect (() => {
        async function getListIdPokemon() {

            try {
                // Pegando a "key de autenticação" do usuário, cadastrado automaticamente pelo firebase
                const myId: string | number = auth.currentUser?.uid;
    
                var listCountPoke = await firebase.database().ref('usuario/' + 'pokemon/').orderByChild('idUser').equalTo(myId)
                
                listCountPoke.on('value', (snapshot) => {
    
                if (snapshot == null) {
                    alert('Você está com a pokedex vázia.')
                } else {
                    var listIdFromFireBase: { 
                        id:number,
                        name: string
                        img: URL
                        weight: number
                        experience: number
                        height: number 
                    }[] = [];

                    snapshot.forEach(childItem => { 
                        listIdFromFireBase.push ({
                            id: childItem.val().id,
                            name: childItem.val().name,
                            img: childItem.val().img,
                            weight: childItem.val().weight,
                            experience: childItem.val().experience,
                            height: childItem.val().height
                        }) 
                        // Setando no useState a key de cadastro do Pokemon no firebase para ser possivel deletar.
                        setIdPoke(childItem.val().key)                 
                    }); 
                }        
                setPokemonList(listIdFromFireBase)

                });
            } catch (error) {   
            }
        }

        getListIdPokemon()

    }, [])

    // Faz o Logout do usuário logado.
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
        // Pegando o ID do pokemon e atribuindo na variavel idPoke, variavel para quando for deletar o pokemon!
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
                    setMeuPokemon(pokemonSearch)
                })
                .catch( () => {
                    alert('Não foi carregar o poke!');
            });
    } 

    // Abre a caixa de opção para deletar o pokemon.
    const submit = () => {
        confirmAlert({
          title: 'Excluir Pokemon!',
          message: 'você realmente quer excluir este Pokemon?',
          buttons: [
            {
              label: 'Confirmar',
              onClick: () =>  {
                try {
                   firebase.database().ref('usuario/' + 'pokemon/' + idPoke).remove();
                  } catch (error) {
                      alert(error);
                  }
                }
            },
            {
              label: 'Cancelar',
              onClick: () => alert('Ação cancelada!')
            }
          ]
        });
      };


    return(
        <div className={styles.container}>
            <div className={styles.header}> 
                <div className={styles.logoHeader}>
                    <img src={Treiner} alt="" />
                    <p> {auth.currentUser?.email}</p>
                    <img src={pokemonLogo} alt="" />
                </div>
                <div className={styles.buttonHeader}>
                    <img src={Logout} alt="" onClick={singOut}/>
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
                        <img src={Pokedex} alt="" />
                        <p>P O K E D E X</p>
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
                                        <div className={styles.deletePoke}>
                                            <img 
                                            src={Delete} 
                                            alt="" 
                                            onClick={() => submit()}
                                            />
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
                        <p>Encontre novos pokemons, clique no mapa!</p> 
                        <img src={Map} alt="" />
                    </Link>

                </div>
            </div>
        </div>
    )
}