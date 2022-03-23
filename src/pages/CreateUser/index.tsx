import React, { useState } from "react";

import styles from "./styles.module.scss";

import { firebaseService } from "../../service/service";




export function CreateUser() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const createNewUser = new firebaseService();
    const singUp = (() => {
        createNewUser.handleCreateUser(email, password)
        setEmail('')
        setPassword('')
    })


    return(
        <div className={styles.container}>
                <div className={styles.tittle}>
                    <h1 className={styles.nick}>Cadastre-se</h1>
                </div>
                <div className={styles.inputForm}>
                    <input 
                    id="form"
                    className={styles.input}
                    placeholder="Seu email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className={styles.inputForm}>
                    <input 
                    className={styles.input}
                    placeholder="Sua senha"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.inputButton}>
                    <button
                    onClick={singUp}
                    className={styles.button}
                    type="submit"> 
                        Criar conta
                    </button>
                </div>
        </div>
    )
}