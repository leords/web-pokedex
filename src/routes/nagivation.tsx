import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { PokeHunt } from "../pages/PokeHunt";


export function Navigation() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/pokedex" element={<Home />}/>
                <Route path="/hunt" element={<PokeHunt />}></Route>
            </Routes>
        </BrowserRouter>
    );
}