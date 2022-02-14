import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { addFriend, fetchUserProfile, removeFriend } from "../api";
import { Loader } from "../components";
import { useAuth } from "../hooks";
import styles from "../styles/settings.module.css";

const UserProfile = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    // State for request in progress when friend is being added or removed.
    const [requestInProgress, setRequestInProgress] = useState(false);
    // useNavigate hook is used for navigating user to another route
    const navigate = useNavigate();
    // useAuth custom hook for getting user information
    const auth = useAuth();

    // In route we have defined the path as /user/:userId , so we can access the userId from the params using the useParams hook.
    const { userId } = useParams();

    // Fetching User Info and setting the user in state.
    useEffect(() => {
        const getUser = async () => {
            // Fetching the user profile details
            const response = await fetchUserProfile(userId);

            if (response.success) {
                // Setting the user state as the user detail fetched from api
                setUser(response.data.user);
            } else {
                toast.error(response.message);
                // Navigating the user to home page, if no user is found
                return navigate('/', { replace: true });
            }

            //Set Loading state as false
            setLoading(false);
        }

        getUser();
    }, [userId, navigate]);

    // If loading is true, then show the loader
    if (loading) {
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
        if (index !== -1) {
            return true;
        }

        //Return false if user is not found
        return false;
    }

    // Handle the remove friend functionality
    const handleRemoveFriendClick = async() => {
        // Enable the request in progress state
        setRequestInProgress(true);

         // Call the removeFriend api and remove the user as friend
        const response = await removeFriend(userId);

        //Getting the friendship from the logged in users state.
        const friendship = auth.user.friends.filter(friend => friend.to_user._id === userId);

        // If response is success
        if(response.success){
            // Update the user friends state, and pass the userId, to remove that userId from the friends list
            // Filter returns an array even if only 1 value is present, so we access the first element in the array to access our friendship
            auth.updateUserFriends(false, friendship[0]);

            // Show success message
            toast.success("Friend removed successfully");
        }else{
            // Show error message
            toast.error(response.message);
        }

        //Disable the request in progress state
        setRequestInProgress(false);
    };

    // Handle the add friend Functionality
    const handleAddFriendClick = async () => {
        // Enable the request in progress state
        setRequestInProgress(true);

        // Call the addFriend api and add the user as friend
        const response = await addFriend(userId);

        // If response is success
        if (response.success) {
            // get the friendship from the response
            const { friendship } = response.data;

            // Update the user friends list in state
            auth.updateUserFriends(true, friendship);
            // Show success message
            toast.success("Friend added successfully");
        }else{
            // Show error in failure
            toast.error(response.message);
        }

        //Disable the request in progress state
        setRequestInProgress(false);
    };

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
                    // On Clicking of button call the handleRemoveFriendsClick function
                    <button className={`button ${styles.saveBtn}`}  onClick={handleRemoveFriendClick} disabled={requestInProgress}>
                        {/* Show Removing Friend... or Remove Friend Based on the requestInProgress state */}
                        {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
                    </button> :
                    // On Clicking of button call the handleAddFriendClick Function
                    <button className={`button ${styles.saveBtn}`} onClick={handleAddFriendClick} disabled={requestInProgress}>
                        {/* Show Adding Friend... or Add Friend Based on the requestInProgress state */}
                        {requestInProgress ? 'Adding friend...' : 'Add Friend'}
                    </button>
                }
            </div>
        </div>
    );
}

export default UserProfile;