import React, { useState } from "react";
import { AuthLogin } from "../AuthLogin";

import styles from "./styles.module.scss";

import pokemonLogo from "../../assets/pokemon-logo.png"
import { Link } from "react-router-dom";
import { CreateUser } from "../CreateUser";

export function Login() {

    const [condition, setCondition] = useState(true)

    return(
        <div className={styles.container}>
            <div className={styles.login}>

                <div className={styles.logo}>
                    <img src={pokemonLogo} alt="" />
                </div>

                {condition == true && (
                    <div className={styles.forms}>
                        <AuthLogin />
                        <div className={styles.containerLink}>
                            <Link
                            to={'/'}
                            onClick={(e) => setCondition(false)}
                            className={styles.link}>
                                Crie sua conta agora, clique aqui!
                            </Link>
                        </div>
                    </div>
                )}
                {condition == false && (
                    <div className={styles.forms}>
                        <CreateUser />
                        <div className={styles.containerLink}>
                            <Link
                            to={'/'}
                            onClick={(e) => setCondition(true)}
                            className={styles.link}>
                                Já sou cadastrado, entrar!
                            </Link>
                        </div>
                    </div>
                )}
           
            </div>
        </div>
    )
}