import React from "react";

import styles from './styles.module.scss';



export function PokeCard(props: { photo: string; name: string; weight: number, height: number, experience: number}) {
    return(
        <div className={styles.perfilPokemon}>
            <div className={styles.cardPoke}>
                <div className={styles.image}>
                    <img src={props.photo} alt="" />
                </div>
                <div className={styles.tittleCard}>
                    <h1>{props.name}</h1>
                </div>
                <div className={styles.description}>
                    <p>Peso: {props.weight}</p>
                    <p>Altura: {props.height}</p>
                    <p>Experiência: {props.experience}</p>
                </div>
            </div>
        </div>
    );
}