import { Route, Routes } from "react-router-dom";
import { EnterName } from "../enter-name/enter-name";
import { useState } from "react";
import { Lobby } from "../lobby/lobby";
import { Connect4SRContext } from "../../App";

interface OnlineProps {
    className?: string;
}

export const Online = ( {className}: OnlineProps ) => {
    let [name, setName] = useState("");
    let [nameSet, setNameSet] = useState(false);
    let [lobby, setLobby] = useState("");

    const joinRoom = (room: string) => {
        setLobby(room);
        Connect4SRContext.invoke("joinLobby", name, room);
    }

    if(nameSet) {
        return <Lobby joinRoom={joinRoom} />
    }

    return  <EnterName name={name} setName={setName} onSubmit={() => setNameSet(!isEmptyOrSpaces(name))} />
}

function isEmptyOrSpaces(str: string){
    return str === null || str.match(/^ *$/) !== null;
}