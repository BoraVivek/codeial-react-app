import styles from '../styles/home.module.css';
import { useAuth } from "../hooks";
import { Link } from 'react-router-dom';

const FriendsList = () => {

    // Getting the logged in user state
    const auth = useAuth();
    // Fetching friends from the logged in user state
    const { friends = [] } = auth.user;

    return (
        <div className={styles.friendsList}>
            <div className={styles.header}>
                Friends
            </div>
            {/* If no friends are present, show No Friends Found */}
            {friends && friends.length === 0 && (
                <div className={styles.noFriends}>
                    No friends Found
                </div>
            )}

            {/* Loop through friends list, and display them in the list */}
            {friends && friends.map(friend =>
                <div key={`friend-${friend.to_user._id}`}>
                    <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
                        <div className={styles.friendsImg}>
                            <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="" />
                        </div>
                        <div className={styles.friendsName}>{friend.to_user.email}</div>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default FriendsList;