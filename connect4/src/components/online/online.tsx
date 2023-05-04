import { Route, Routes } from "react-router-dom";
import { EnterName } from "../enter-name/enter-name";
import { useState } from "react";
import { Lobby } from "../lobby/lobby";

interface OnlineProps {
    className?: string;
}

export const Online = ( {className}: OnlineProps ) => {
    let [name, setName] = useState("");
    let [nameSet, setNameSet] = useState(false);

    if(nameSet) {
        return <Lobby />
    }

    return  <EnterName name={name} setName={setName} onSubmit={() => setNameSet(!isEmptyOrSpaces(name))} />
}

function isEmptyOrSpaces(str: string){
    return str === null || str.match(/^ *$/) !== null;
}