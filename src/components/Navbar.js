import { Link} from "react-router-dom";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/" >
                    <img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt="Logo" />
                </Link>
            </div>

            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <Link to="/">
                        <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="user-pic" className={styles.userDp} />
                    </Link>
                    <span>Aakash</span>
                </div>

                <div className={styles.navLinks}>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;