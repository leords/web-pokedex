import React from "react";
import {firebase, auth} from "../service/firebase";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";




class firebaseService {


/*Cadastro de novos usuários */
    handleCreateUser = (email:string, password:string) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        alert('Sua conta foi criado com sucesso!')
        })
        .catch(error => alert(error.message))
    }

/*Login de novos usuários*/
    handleSubmitt = (email:string, password:string) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
        })
        .catch(error => alert(error.message)) 
    }

/*observador do estado de autenticação e coletar dados dos usuários*/
    unsubcribe = firebase.auth().onAuthStateChanged(user => {
        const navigation = useNavigate()
        if(user) {
            navigation('/pokedex')
        }

    return this.unsubcribe
    })

/*Função deslogar usuario */
        singOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            const navigation = useNavigate()
            navigation('/')
        }).catch(error => alert(error.message));
    }




}


export {firebaseService}
