import { useState } from "react";
import toast from "react-hot-toast";
import styles from "../styles/login.module.css";
import { useAuth } from "../hooks";

const Login = () => {

    // Creating States for email, password, and logging in
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    
    // Using the useAuth hook, to perform authentication functions of AuthContext
    const auth = useAuth();
    // console.log(auth);

    // Handles the form submission 
    const handleSubmit = async (e) => {
        // Preventing default behavior of form
        e.preventDefault();
        //Setting the loggingin state to true, so that the button gets disabled.
        setLoggingIn(true);

        // If email or password is not provided, then show a toast notification
        if(!email || !password){
            // Set Loggingin state to false, so that the Form button is enabled again
            setLoggingIn(false);
            return toast.error("Please enter both email and password");
        }

        // Using the login functionality form the context of AuthContext, as useAuth uses useContext(AuthContext) provider behind the scene. 
        const response = await auth.login(email, password);

        // If response is success, then show a toast notification showing success of login
        if(response.success){
            toast.success("Successfully logged in");
        }else{
            // If the response is not success, then show a toast notification showing error message
            toast.error(response.message);
        }

        // Set Loggingin state to false, so that the Form button is enabled again
        setLoggingIn(false);
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