import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) =>{
    const s1 = {
        "name" : "Dev",
        "class" : "8b"
    }
    const [state, setState] = useState(s1);
    const update=()=>{
        setTimeout(()=>{
            setState({
                "name": "Lary",
                "class": "13c"
            })
        }, 4000)
    }
    return(
    <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;