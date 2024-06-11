# The Context API:-

./useContext.jsx

import "createContext" from "react;

const noteContext = createContext();

export default notecontext;

./noteState.jsx

import react from "react";
import noteContext from "./noteContext";

const NoteState = ()=>{

    const state = {
        "name":"mehul",
        "age":15,
    }

    return(
        <noteContext.provider value={state}>
        </noteContext.provider>
    )
}

./About.jsx

import {useContext} from 'react

const a = usecontext(noteContext); 

later we directly use this in any file{a.name}

