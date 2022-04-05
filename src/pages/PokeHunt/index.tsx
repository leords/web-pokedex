import React from "react";

import styles from './styles.module.scss';

import pokemonLogo from "../../assets/pokemon-logo.png";
import { PokeCard } from "../../component/PokeCard";
import Photo from '../../assets/charizard.png';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const pokemonIniciais = [
    {id: 1, nome: "Bulbasauro", peso: 10},
    {id: 4, nome: "Charmander", peso: 12},
    {id: 7, nome: "Squirtle", peso: 15}
];

export function PokeHunt() {
    return(
        /* 
        criar uma lista de pokemon com randow aleatorio de ID's
        fazer carrosel dessa lista de pokemons.
        botão "pegar" para salvar na lista de pokemon   
        */
        <div className={styles.container}>
            <div className={styles.header}>
                 <img src={pokemonLogo} alt="" />
            </div>
            <div className={styles.camp}>
                <div className={styles.containerCorousel}>
                    <Carousel
                        className={styles.carousel}
                        autoPlay={true}
                        infiniteLoop={true}
                        interval={3000}
                        showThumbs={true}
                    >
                        {pokemonIniciais.map(pokemon => (
                            <div className={styles.listCard}>
                                <PokeCard 
                                    photo={Photo}
                                    name={'Miutwho'}
                                    height= {125}
                                    weight={pokemon.peso}
                                    experience={12000}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}