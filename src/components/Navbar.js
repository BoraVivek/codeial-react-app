import styles from "../styles/navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href="/" >
                    <img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt="Logo" />
                </a>
            </div>

            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <a href="/">
                        <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="user-pic" className={styles.userDp} />
                    </a>
                    <span>Aakash</span>
                </div>

                <div className={styles.navLinks}>
                    <ul>
                        <li><a href="/">Login</a></li>
                        <li><a href="/">Logout</a></li>
                        <li><a href="/">Register</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;