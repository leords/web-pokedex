import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

import logo from "../../assets/icones/pokedex.png";
import pokemon from "../../assets/charizard.png";
import pokemonLogo from "../../assets/pokemon-logo.png";
import { auth } from "../../service/firebase";

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

    return(
        <div className={styles.container}>

            <div className={styles.header}>
                <h1>Olá, Leonardo</h1>
                <img src={pokemonLogo} alt="" />
                <button
                    onClick={singOut}
                >
                    SAIR
                </button>
            </div>

            <div className={styles.bodyPokedex}>
                <div className={styles.perfilPokemon}>
                    <div className={styles.cardPoke}>
                        <div className={styles.image}>
                            <img src={pokemon} alt="" />
                        </div>
                        <div className={styles.tittleCard}>
                            <h1>CHARIZARD</h1>
                        </div>
                        <div className={styles.description}>
                            <p>Pokémon do tipo Fogo e Voador. Ele é a forma evoluída de Charmeleon quando chega no nível 36. Ele tambem é a forma final de Charmander.</p>
                        </div>
                    </div>

                    <div className={styles.cardPoke2}>
                    </div>
                    <div className={styles.cardPoke3}>
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
                    <div className={styles.listPoke}>
                        <div className={styles.poke}>
                            <div className={styles.imagePoke}>
                                <img src={pokemon} alt="" />
                            </div>
                            <div className={styles.infoPoke}>
                                <h1>Charizzard</h1>
                                <p>Peso: 150oz</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.listPoke}>
                        <div className={styles.poke}>
                            <div className={styles.imagePoke}>
                                <img src={pokemon} alt="" />
                            </div>
                            <div className={styles.infoPoke}>
                                <h1>Charizzard</h1>
                                <p>Peso: 150oz</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.listPoke}>
                        <div className={styles.poke}>
                            <div className={styles.imagePoke}>
                                <img src={pokemon} alt="" />
                            </div>
                            <div className={styles.infoPoke}>
                                <h1>Charizzard</h1>
                                <p>Peso: 150oz</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}