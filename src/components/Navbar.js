import { Link} from "react-router-dom";
import { useAuth } from "../hooks";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
    // Using the authentication hook to verify authentication and perform authentication action like logout
    const auth = useAuth();

    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/" >
                    <img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt="Logo" />
                </Link>
            </div>

            <div className={styles.rightNav}>
                {/* Show User Profile and Name, Only if user is logged in */}
                {auth.user && 
                    <div className={styles.user}>
                        <Link to="/settings">
                            <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="user-pic" className={styles.userDp} />
                        </Link>
                        <span>{auth.user.name}</span>
                    </div>
                }

                <div className={styles.navLinks}>
                    {/* Show Logout when User is logged in, else show Login and Register Links */}
                    <ul>
                    {auth.user ? (
                    <>
                        <li><button onClick={auth.logout}>Logout</button></li>
                    </>) : 
                    (<>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>)}
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;