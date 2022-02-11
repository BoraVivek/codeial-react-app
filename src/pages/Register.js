import { useState } from "react";
import styles from "../styles/login.module.css";
import toast from 'react-hot-toast';
import { useAuth } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signingUp,setsigningUp] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate(); //Using Navigate of react-router-dom which is updated version of history

    const handleSubmit = async (e) => {
        e.preventDefault();
        setsigningUp(true);

        if(!name || !email || !password || !confirmPassword){
            setsigningUp(false);
            return toast.error("All fields are required");;
        }

        if(password !== confirmPassword){
            setsigningUp(false);
            return toast.error("Password and Confirm Password should be same!");;
        }

        const response = await auth.signup(name, email, password, confirmPassword);

        if(response.success){
            // Navigating to Login Page, if user is successfully registered
            navigate('/login', {replace: true});
            setsigningUp(false);
            return toast.success("Registeration is successful");
        }else{
            setsigningUp(false);
            return toast.error(`Registration Failed: ${response.message}`);
        }
    }

    // If the user is logged in and tries to access the register page, then redirect him to Index Page
    if(auth.user){
        // Redirect is now Navigate in react-router-dom version 6
        return <Navigate to="/" />
    }

    return(
         // On Submitting the form calling handleSubmit function
         <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}>Register</span>

            <div className={styles.field}>
                <input type="text" name="name" id="name" placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} />
            </div>

            <div className={styles.field}>
                <input type="email" name="email" id="email" placeholder="Email"  
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={styles.field}>
                <input type="password" name="password" id="password" placeholder="Password"  
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className={styles.field}>
                <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password"  
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <div className={styles.field}>
                {/* Disable Button if the form is processing */}
                <button disabled={signingUp}>
                    {/* Show Loggingin message, so that user can know that the form is processing. */}
                    {signingUp ? 'Registering your account...' : 'Register'}
                </button>
            </div>
        </form>
    );
}

export default Register;