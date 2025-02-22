import React,{useState} from "react"
import PopUp from "../PopUp/PopUp.js"

const AddFoodForm = ({userId, setFoodList, foodList, setShowAdd}) => {
    const [errorMessages, setErrorMessages] = useState([])
    
    const onSubmitFood = event => {
        event.preventDefault()
        
        const foodObj = {name:event.target[0].value, weight:parseInt(event.target[1].value), calories:parseInt(event.target[2].value), user_id:userId}
        
        fetch("/foods", {
            method: "POST",
            headers: {"Content-Type":"Application/json"},
            body: JSON.stringify(foodObj)
        })
        .then(resp => resp.json())
        .then(createdObject => {
            if (createdObject.errors) setErrorMessages(createdObject.errors)
            else {
                setFoodList([...foodList,createdObject])
                setShowAdd(false)
            }
        })
    }
    return (
        <div id="add">
            <button onClick={() => setShowAdd(false)}>X</button>
            <form onSubmit={onSubmitFood}>
                <input type="text" name="name" placeholder="Food"/>
                <br/>
                <input type="text" name="weight" placeholder="weight (g)"/>
                <br/>
                <input type="text" name="calories" placeholder="calories (kcal)"/>
                <br/>
                <input type="submit" value="Add" id="button-form"/>
            </form>
            <PopUp errorMessages={errorMessages}/>
        </div>
    )
}

export default AddFoodForm