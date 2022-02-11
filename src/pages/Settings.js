import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useState } from "react";

const Settings = () => {

    // get authentication details
    const auth = useAuth();

    // States
    const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [savingForm, setSavingForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    //Function to update profile
    const updateProfile = () => {
        setSavingForm(true);
    }

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
                    {/* Ternary Operator, wherein, if users exists then only try accessing email, otherwise return undefined, alternative to auth.user && auth.user.email */}
                    {auth.user?.email}
                </div>
            </div>
            {/* If editing Mode is enabled show the input box, otherwise show the name text. */}
            {isEditing ?
                <div className={styles.field}>
                    <div className={styles.fieldLabel}>
                        Name
                    </div>
                    <div className={styles.fieldValue}>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                :
                <div className={styles.field}>
                    <div className={styles.fieldLabel}>
                        Name
                    </div>
                    <div className={styles.fieldValue}>
                        {auth.user?.name}
                    </div>
                </div>
            }

            {/* Show input boxes only if editing mode is enabled */}
            {isEditing &&
                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>
                            Password
                        </div>
                        <input type="password" name="password" id="password" value={password} onClick={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>
                            Confirm Password
                        </div>
                        <input type="password" name="confirm_password" id="confirmPassword" value={confirmPassword} onClick={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </>
            }

            {/* Buttons */}
            <div className={styles.btnGrp}>
                {/* Show Save and Go Back button if editing mode is enabled, else show Edit Profile button which enabled Editing Mode */}
                {isEditing ? 
                    <>
                        {/* Calls the updateProfile function */}
                        <button className={`button ${styles.saveBtn}`} disabled={savingForm} onClick={updateProfile}>
                            {savingForm ? 'Saving profile...' : 'Save Profile'}
                        </button>

                        {/* Disables the editing mode */}
                        <button className={`button ${styles.goBack}`} onClick={() => setIsEditing(false)}>Go Back</button>
                    </>
                    :
                    // Enables the editing Mode
                    <button className={`button ${styles.editBtn}`} onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                }
                
            </div>
        </div>
    );
}

export default Settings;