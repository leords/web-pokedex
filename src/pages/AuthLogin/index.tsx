import React, { useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {firebase, auth} from "../../service/firebase";
import {firebaseService} from "../../service/service";


import styles from "./styles.module.scss";

import { useNavigate, Link } from "react-router-dom";


export function AuthLogin() {

    const navigation = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

/*observador do estado de autenticação e coletar dados dos usuários*/
    useEffect( () => {
        const unsubcribe = firebase.auth().onAuthStateChanged(user => {
            if(user) {
                navigation('/pokedex')
            }
        })

        return unsubcribe
    }, [])

    
/*Testando para separar as funções em um classe*/
    const controllerFirebase = new firebaseService()
    const singIn = () => {
        controllerFirebase.handleSubmitt(email, password)
    }

    return(
        <div className={styles.container}>
            <div className={styles.tittle}>
                <h1 className={styles.nick}>Bem vindo!</h1>
            </div>
            <div className={styles.inputForm}>
                <input 
                className={styles.input}
                placeholder="Login"
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.inputForm}>
                <input 
                className={styles.input}
                placeholder="*********"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.inputButton}>
                <button
                onClick={singIn}
                className={styles.button}
                type="submit"> 
                    Entrar
                </button>
            </div>
        </div>
    )
}