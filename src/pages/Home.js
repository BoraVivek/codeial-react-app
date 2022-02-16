// import PropTypes from "prop-types";
import styles from "../styles/home.module.css";
import { CreatePost, FriendsList, Loader, Post } from '../components';
import { useAuth, usePosts } from '../hooks';

// We are getting posts in props, so we are de-structuring the props
const Home = () => {
    // * Getting the logged-in user state
    const auth = useAuth();


    const posts = usePosts();

    // If the content is still being fetched, then show the loader.
    if (posts.loading) {
        return (
            <Loader />
        );
    }

    return (
        <div className={styles.home}>
            <div className={styles.postsList}>
                {/* Loading Create Post Component */}
                <CreatePost />
                {/* Looping through the posts */}
                {posts.data.map((post) => (
                    <Post key={`post-${post._id}`} post={post} />
                ))}
            </div>

            {/* If user is logged in show the Friends List */}
            {auth.user && <FriendsList />}
        </div>
    );
};

export default Home;