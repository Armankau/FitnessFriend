import React,{useState, useEffect} from "react";
import { useNavigate } from  "react-router-dom"
import NavBar from "../NavBar/NavBar.js"
import AddFoodForm from "./AddFoodForm.js";
import AddExerciseForm from "./AddExerciseForm.js";
import FoodContainer from "./FoodContainer.js";
import ExerciseContainer from "./ExerciseContainer.js";
import "./TodayPage.css"


const TodayPage = () => {

    const navigate = useNavigate()

    const [calGoal, setCalGoal] = useState(0)
    const [calConsumed, setCalConsumed] = useState(0)
    const [calBurnt, setCalBurnt] = useState(0)
    const [showAddFood, setShowAddFood] = useState(false)
    const [showAddExercise, setShowAddExercise] = useState(false)
    const [userId, setUserId] = useState(null)
    const [foodList, setFoodList] = useState([])
    const [exerciseList, setExerciseList] = useState([])
    const [mealArray, setMealArray] = useState([])

    useEffect(() => {
        fetch("/me")
        .then(resp => resp.json())
        .then(userData => {
            if (userData.error === "not authorized") navigate("/login")
            else {
                setCalGoal(userData.calories_goal)
                setUserId(userData.id)
                setFoodList(userData.foods.filter(food => food.created_at.slice(0,10) === new Date().toJSON().slice(0, 10)))
                setExerciseList(userData.exercises.filter(exercise => exercise.created_at.slice(0,10) === new Date().toJSON().slice(0, 10)))
            }})
    }, [])

    useEffect(() => {
        const anotherArray = []
        for (let i = 0; i < 4; i++) {
            fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(resp => resp.json())
            .then(meal => {
                anotherArray.push({
                    name: meal.meals[0].strMeal,
                    img: meal.meals[0].strMealThumb, 
                    url: meal.meals[0].strSource
                })
                setMealArray([...anotherArray])
            })
        }
    },[])

    const MealSuggestions = ({mealArray}) => {
        const theMeals = mealArray.map(meal => {
            console.log(meal.url)
            return (
                <div key={meal.name} className="meal-div">
                    <p>{meal.name}</p>
                    <a href={meal.url} target="_blank">
                        <img src={meal.img} alt={meal.name} width="200px" height="200px"/>
                    </a>
                </div>
            )
        })
        return theMeals
    }
    useEffect(()=> {
        // document.body.className("todayPage")
        const body = document.getElementsByTagName("body")[0]
        body.className = "todayPage"
        console.log(body)
    },[])

    //keeps track of all the calories 
    useEffect(() => {
        setCalConsumed(
            foodList.reduce((sum, current) => sum + current.calories, 0)
        )
        setCalBurnt(
            exerciseList.reduce((sum, current) => sum + current.calories_burnt, 0)
        )
    }, [foodList, exerciseList])

    const addingFoodForm = showAddFood ? <AddFoodForm userId={userId} setFoodList={setFoodList} foodList={foodList} setShowAdd={setShowAddFood}/> : <></>
    const addingExerciseForm = showAddExercise ? <AddExerciseForm userId={userId} setExerciseList={setExerciseList} exerciseList={exerciseList} setShowAdd={setShowAddExercise}/> : <></>

    return (
        <div className="Today">
            <NavBar/>
            <div className="calories-display">
                <p>Total Calories Goal: {calGoal}</p>
                <p>Calories Consumed: {calConsumed}</p>
                <p>Burnt calories: {calBurnt}</p>
                <p>Calories Left: {calGoal - calConsumed + calBurnt}</p>
            </div>
            

            <div id="main-container">
                <div id="track-food">
                    <p className="item-header">Track Food</p>
                    <FoodContainer foodList={foodList} setFoodList={setFoodList}/>
                    <button className="add-item" onClick={() => setShowAddFood(true)}>Add Food</button>
                    {addingFoodForm}
                </div>

                <div id="track-exercise">
                    <p className="item-header">Track Exercise</p>
                    <ExerciseContainer exerciseList={exerciseList} setExerciseList={setExerciseList} />
                    <button className="add-item" onClick={() => setShowAddExercise(true)}>Add Exercise</button>
                    {addingExerciseForm}
                </div>
            </div>
            <div id="suggested-meals">
                <MealSuggestions mealArray={mealArray} />
            </div>
                
        </div>
    )
}

export default TodayPage