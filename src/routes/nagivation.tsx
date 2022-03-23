import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";


export function Navigation() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/pokedex" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}