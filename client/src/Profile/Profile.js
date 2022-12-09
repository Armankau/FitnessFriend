import React, {useState, useEffect} from "react";
import { useNavigate } from  "react-router-dom"
import NavBar from "../NavBar/NavBar";
import ProfileUpdateAge from "./ProfileUpdateAge";
import ProfileUpdateCalories from "./ProfileUpdateCalories";
import ProfileUpdateSex from "./ProfileUpdateSex";
import ProfileUpdateUsername from "./ProfileUpdateUsername";
import PopUp from "../PopUp/PopUp.js"

function Profile(){
    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const [age, setAge] = useState(user.age)
    const [sex, setSex] = useState(user.sex)
    const [calories_goal, setCaloriesGoal] = useState(user.calories_goal)
    const [username, setUsername] = useState(user.username)
    const [errorMessage, setErrorMessage] = useState([])

    useEffect(() => {
        fetch("/me")
        .then(resp => resp.json())
        .then(data => {
            if (["not authorized", "User not found"].includes(data.error)) {
                navigate("/login")
            }
            else setUser(data)
        })
    }, [])

    function handleAgeSubmit(e) {
        e.preventDefault()
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                age: age
            })
        })
        .then(resp => resp.json())
        .then((user) => {
            if (user.errors) setErrorMessage(user.errors)
            else setUser(user)
        })
    }
    useEffect(()=> {
        // document.body.className("todayPage")
        const body = document.getElementsByTagName("body")[0]
        body.className = "profilePage"
        // console.log(body)
    },[])

    function handleSexSubmit(e) {
        e.preventDefault()
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                sex: sex
        })
    })
        .then(resp => resp.json())
        .then((user) => {
            if (user.errors){
                setErrorMessage(user.errors)
            }
            setUser(user)
        })
    }
    function handleCaloriesSubmit(e) {
        e.preventDefault()
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                calories_goal: calories_goal
            })
        })
        .then(resp => resp.json())
        .then((user) => {
            if (user.errors) setErrorMessage(user.errors)
            else setUser(user)
        })
    }

    function handleUsernameSubmit(e) {
        e.preventDefault()
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username
            })
        })
        .then(resp => resp.json())
        .then((user) => {
            if (user.errors) setErrorMessage(user.errors)
            else setUser(user)
        })
    }


    function handleAge(e){
       setAge(e.target.value)
    }

    function handleSex(e){
        setSex(e.target.value)
    }
    
    function handleCalories(e){
        setCaloriesGoal(e.target.value)
    }

    function handleUsername(e){
        setUsername(e.target.value)
    }
    

    return (
    <div>
        <NavBar />
        <div className="profileContainer">
            <div className="profileInformation">
                <h1>Your Profile</h1> 
                <h2>Personal Information</h2>
                <p>
                    Username: {user.username}
                    <ProfileUpdateUsername handleUsername={handleUsername} username={username} handleUsernameSubmit={handleUsernameSubmit}/>
                </p> 
                <p>
                    Age: {user.age}
                    <ProfileUpdateAge age={age} handleAge={handleAge} handleAgeSubmit={handleAgeSubmit}/>
                </p>
                <p>
                    Sex: {user.sex}
                    <ProfileUpdateSex sex={sex} handleSex={handleSex} handleSexSubmit={handleSexSubmit}/>
                </p>
                <h2>Personal Goals</h2>
                <p>
                    Daily Calories Goal: {user.calories_goal}
                    <ProfileUpdateCalories calories_goal={calories_goal} handleCalories={handleCalories} handleCaloriesSubmit={handleCaloriesSubmit}/>
                </p>
            </div>
        </div>
        <PopUp errorMessages={errorMessage}/>
     </div>
    )

}

export default Profile;