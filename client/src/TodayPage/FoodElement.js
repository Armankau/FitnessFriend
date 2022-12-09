import React from "react";

const FoodElement = ({name, weight, calories, id, setFoodList, foodList}) => {
    const handleDelete = event => {
        fetch(`/foods/${id}`, {method:"DELETE"})
        setFoodList(foodList.filter(food => food.id !== parseInt(event.target.id)))
    }

    return (
        <div id="row">
            <p className="item">{name}</p>
            <p className="item">{`${weight} grams`}</p>
            <p className="item">{`${calories} calories`}</p>
            <button 
                id={id} 
                onClick={handleDelete}
            >Delete Food</button>
        </div>
    )
}

export default FoodElement