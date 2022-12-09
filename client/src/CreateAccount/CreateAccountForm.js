import React,{useState, useEffect} from "react"
import { useNavigate } from  "react-router-dom"
import PopUp from "../PopUp/PopUp.js"
import "./CreateAccount.css"

const CreateAccountForm = () => {

    //Controlled form for username and password
    const [formData, setFormData] = useState({
        age:"",
        calories_goal:"",
        username:"", 
        password:"",
        sex:""
    })

    const [errorM, setErrorM] = useState({errors:[]})

    const onDataChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value})
    }
    const navigate = useNavigate()
    const [errors, setErrors] = useState()

    const createAccount = (event) => {
        event.preventDefault()

        fetch("/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((r) => r.json())
            .then(postResponse => {
                if (postResponse) setErrorM(postResponse) 
                else navigate("/login")
            }
                );

    }

    useEffect(()=> {
        // document.body.className("todayPage")
        const body = document.getElementsByTagName("body")[0]
        body.className = "createAccount"
        // console.log(body)
    },[])
    
    function handleBack(){
        navigate("/login")
    }
    
    return (
        <div className="form-container">
            <form className="create-user" onSubmit={createAccount}>
            <h1>Welcome to Fitness Friend!</h1>
            <h2>Sign up for an account today and improve your health by becoming more mindful of your food and exercise!</h2>
                <input type="text" name="age" placeholder="Enter your age..." onChange={onDataChange}/>
                <br/>
                <input type="text" name="calories_goal" placeholder=" Enter your calories goal..." onChange={onDataChange}/>
                <br/>
                <input type="text" name="username" placeholder="Enter your username..." onChange={onDataChange}/>
                <br/>
                <input type="password" name="password" placeholder="Enter your password..." onChange={onDataChange}/>
                <br/>
                <input type="text" name="sex" placeholder="Enter your sex..." onChange={onDataChange}/>
                <br/>
                <input type="submit" name="create_user" value="Create Account" id={"submit-account"} />
                <h3>OR</h3>
                <input type="button" name="create_user" value="Go Back to Login" id={"back-account"} onClick={handleBack}/>
                <label>{errors}</label>
            </form>
            <PopUp errorMessages={errorM.errors}/>
        </div>
    )
}

export default CreateAccountForm