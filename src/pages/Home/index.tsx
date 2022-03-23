import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

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
            <h1>Leonardo</h1>
            <button
                onClick={singOut}
            >
                Sair
            </button>
        </div>
    )
}