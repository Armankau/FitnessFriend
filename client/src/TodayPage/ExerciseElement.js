import React from "react";

const ExerciseElement = ({name, duration, calories, id, exerciseList, setExerciseList}) => {
    const handleDelete = event => {
        fetch(`/exercises/${id}`, {method:"DELETE"})
        setExerciseList(exerciseList.filter(exercise => exercise.id !== parseInt(event.target.id)))
    }

    return (
        <div id="row">
            <p className="item">{name}</p>
            <p className="item">{`${duration} minutes`}</p>
            <p className="item">{`${calories} calories`}</p>
            <button 
                id={id} 
                onClick={handleDelete}
            >Delete Exercise</button>
        </div>
    )
}

export default ExerciseElement