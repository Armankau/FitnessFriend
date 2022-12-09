import React,{useState, useEffect} from "react";
import "./Popcss.css"

const PopUp = ({errorMessages}) => {

    const [show, setShow] = useState(false)
    const allErrorMessages = errorMessages.map(error => <p key={error}>{error}</p>)
    useEffect(() => {
        if (errorMessages[0]) setShow(true)
    }, [errorMessages])

    const handleClick = event => {
        setShow(false)
    }

    return (
        <>
        {show ? 
            <div id="annoying-popup">
                {allErrorMessages}
                <button onClick={handleClick} className="popButton">Ok</button>
            </div>
            :
            <div></div>
        }
        </>
    )
}

export default PopUp