import { useState } from "react";
import toast from "react-hot-toast";
import styles from "../styles/login.module.css";

const Login = () => {

    // Creating States for email, password, and logging in
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    // Handles the form submission 
    const handleSubmit = (e) => {
        // Preventing default behavior of form
        e.preventDefault();
        //Setting the loggingin state to true, so that the button gets disabled.
        setLoggingIn(true);

        // If email or password is not provided, then show a toast notification
        if(!email || !password){
            return toast.error("Please enter both email and password");
        }
    }

    return (
        // On Submitting the form calling handleSubmit function
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}>Log In</span>

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
                {/* Disable Button if the form is processing */}
                <button disabled={loggingIn}>
                    {/* Show Loggingin message, so that user can know that the form is processing. */}
                    {loggingIn ? 'Logging In...' : 'Login'}
                </button>
            </div>
        </form>
    );
}

export default Login;