import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

import logo from "../../assets/icones/pokedex.png";

import { Login } from "../Login";

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
                <h1>Usuario</h1>
                <button
                    onClick={singOut}
                >
                    Sair
                </button>
            </div>

            <div className={styles.bodyPokedex}>
                <div className={styles.perfilPokemon}>
                    <div className={styles.cardPoke}>

                    </div>
                </div>

                <div className={styles.listPokemon}>
                    <div className={styles.imageLogo}>
                        <img src={logo} alt="" />
                        <h1>Pokedex</h1>
                    </div>
                    <div className={styles.listPoke}>
                        <div className={styles.tittle}>
                            <p>Meus Pokemons</p>
                        </div>
                        <div className={styles.poke}>
                            <div className={styles.imagePoke}>
                                <img src={logo} alt="" />
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