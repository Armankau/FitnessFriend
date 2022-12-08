import React from "react";
import { useState } from "react";

function PopUp({errors}){

    const [error, setError] = useState(false)
    
    function handleError(){
        setError(!error)
    }

    // const message = errors.map((err) => err)
    // console.log(message)

    return (
        <h1>{error? 
            <div>
\                {errors}
            </div>
            :
            <div></div>
        }</h1>
    ) 
}

export default PopUp;