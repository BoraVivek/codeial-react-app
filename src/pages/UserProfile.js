import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserProfile } from "../api";
import { Loader } from "../components";
import { useAuth } from "../hooks";
import styles from "../styles/settings.module.css";

const UserProfile = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = useAuth();

    // In route we have defined the path as /user/:userId , so we can access the userId from the params using the useParams hook.
    const {userId} = useParams();

    // Fetching User Info and setting the user in state.
    useEffect(() => {
        const getUser = async() => {
            // Fetching the user profile details
            const response = await fetchUserProfile(userId);

            if(response.success){
                // Setting the user state as the user detail fetched from api
                setUser(response.data.user);
            }else{
                toast.error(response.message);
                // Navigating the user to home page, if no user is found
                return navigate('/', {replace: true});
            }

            //Set Loading state as false
            setLoading(false);
        }

        getUser();
    }, [userId, navigate]);

    // If loading is true, then show the loader
    if(loading){
        return <Loader />;
    }

    // Function to check if a user is friend or not
    const checkIfUserIsAFriend = () => {
        // Storing friends list of logged in user
        const friends = auth.user.friends;
        
        // Mapping through the friends list of logged in user, and fetching the user Ids out of it
        const friendIds = friends.map(friend => friend.to_user._id)

        //Checking if the userId present in Params exists in the friendsList of logged in user or not
        const index = friendIds.indexOf(userId);

        // If user is present, then return true
        if(index !== -1){
            return true;
        }

        //Return false if user is not found
        return false;
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
                {/* If user is a friend then show the remove friend button, else show add friend button */}
                {checkIfUserIsAFriend() ? 
                    <button className={`button ${styles.saveBtn}`} >
                        Remove Friend
                    </button> : 
                    <button className={`button ${styles.saveBtn}`} >
                        Add Friend
                    </button>
                }
            </div>
        </div>
    );
}

export default UserProfile;