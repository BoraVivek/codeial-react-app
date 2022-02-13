import { useLocation } from "react-router-dom";
import styles from "../styles/settings.module.css";

const UserProfile = () => {
    // We are using useLocation hook to access the props passed to the Link component and the details
    // Location represent where the app is now, where you want it to go, or even where it was.
    //useLocation provies the following details
    /*  hash: ""
        key: "xwrxrd3k"
        pathname: "/user/620569ec6938bd457a869e59"
        search: ""
        state:
            user: {_id: '620569ec6938bd457a869e59', email: 'payal@payal.com', name: 'payal'}
    */
    const location = useLocation();

    // If state is undefined, we make user variable an empty string, otherwise it de-structures the user object from state which is passed to the Link component as state prop.
    const {user = {}} = location.state;

    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="" />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                    Email
                </div>
                <div className={styles.fieldValue}>
                    {/* Ternary Operator, wherein, if users exists then only try accessing email, otherwise return undefined, alternative to user && user.email */}
                    {user?.email}
                </div>
            </div>
            
            <div className={styles.field}>
                <div className={styles.fieldLabel}>
                    Name
                </div>
                <div className={styles.fieldValue}>
                    {user?.name}
                </div>
            </div>

            {/* Buttons */}
            <div className={styles.btnGrp}>
                <button className={`button ${styles.saveBtn}`} >
                    Add Friend
                </button>
                <button className={`button ${styles.saveBtn}`} >
                    Remove Friend
                </button>
            </div>
        </div>
    );
}

export default UserProfile;