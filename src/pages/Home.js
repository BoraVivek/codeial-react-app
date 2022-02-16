// import PropTypes from "prop-types";
import styles from "../styles/home.module.css";
import { Comment, CreatePost, FriendsList, Loader } from "../components";
import { Link } from "react-router-dom";
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
                    <div className={styles.postWrapper} key={`post-${post._id}`}>
                        <div className={styles.postHeader}>
                            <div className={styles.postAvatar}>
                                <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="user-pic" />
                                <div>
                                    <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>{post.user.name}</Link>
                                    <span className={styles.postTime}>a minute ago</span>
                                </div>
                            </div>
                            <div className={styles.postContent}>{post.content}</div>
                            <div className={styles.postActions}>
                                <div className={styles.postLike}>
                                    <img src="https://www.svgrepo.com/show/28731/like.svg" alt="likes-icon" />
                                    <span>{post.likes.length}</span>
                                </div>

                                <div className={styles.postCommentsIcon}>
                                    <img src="https://www.svgrepo.com/show/357086/comments.svg" alt="comments-icon" />
                                    <span>{post.comments.length}</span>
                                </div>
                            </div>
                            <div className={styles.postCommentBox}>
                                <input type="text" placeholder="Start typing a comment" />
                            </div>

                            <div className={styles.postCommentsList}>
                                {/* Looping through comments, and rendering the Comment component by passing the comment to it. */}
                                {post.comments.map((comment) => {
                                    return (
                                        <Comment comment={comment} key={comment._id} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* If user is logged in show the Friends List */}
            {auth.user && <FriendsList />}
        </div>
    );
};

export default Home;