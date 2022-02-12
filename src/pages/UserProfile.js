import styles from "../styles/settings.module.css";

const UserProfile = () => {
    const user ={};

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