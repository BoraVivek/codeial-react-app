import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";

const Settings = () => {
    const auth = useAuth();

    return(
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="" />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                    Email
                </div>
                <div className={styles.fieldValue}>
                    {/* Ternary Operator, wherein, if users exists then only try accessing email, otherwise return undefined, alternative to auth.user && auth.user.email */}
                    {auth.user?.email}
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                    Name
                </div>
                <div className={styles.fieldValue}>
                    {auth.user?.name}
                </div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                    Password
                </div>
                <input type="password" name="password" id="password" />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                    Confirm Password
                </div>
                <input type="password" name="confirm_password" id="confirmPassword" />
            </div>

            <div className={styles.btnGrp}>
                <button className={`button ${styles.editBtn}`}>Edit Profile</button>  
            </div>
        </div>
    );
}

export default Settings;