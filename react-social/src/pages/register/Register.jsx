import "./register.css"
import { useRef } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useHistory} from "react-router";

export default function Register() {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const history = useHistory();

    const handleClick= async (e)=>{  
        e.preventDefault();
        if(passwordAgain.current.value!== password.current.value){
            password.current.setCustomValidity("Password dont match!!");
        }else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try{
            await axios.post("/auth/register",user);
            history.push("/login");

            }catch(err){
                console.log(err);
            }
        }
    };
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialBook</h3>
                    <span className="loginDesc">The Book helps to connect you with the world... SocialBook</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username" required ref={username} className="loginInput" />
                        <input placeholder="email" required ref={email} type="email" className="loginInput" />
                        <input placeholder="password" minLength="6" required ref={password} type="password" className="loginInput" />
                        <input placeholder="password" minLength="6" required ref={passwordAgain} type="password" className="loginInput" />
                        <button className="loginButton" type="submit">Sign In</button>
                        <button className="loginRegisterButton"><Link to={`/login`}>Log in TO your ACCOUNT</Link></button>
                    </form>
                </div>
            </div>
        </div>
    )
}
