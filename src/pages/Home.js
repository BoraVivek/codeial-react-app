import PropTypes from "prop-types";
import styles from "../styles/home.module.css";
import {Comment} from "../components";

// We are getting posts in props, so we are de-structuring the props
const Home = ({ posts }) => {
    return (
        <div className={styles.postList}>
            {/* Looping through the posts */}
            {posts.map((post) => (
                <div className={styles.postWrapper} key={`post-${post._id}`}>
                    <div className={styles.postHeader}>
                        <div className={styles.postAvatar}>
                            <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="user-pic" />
                            <div>
                                <span className={styles.postAuthor}>{post.user.name}</span>
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
    );
};

// Defining the propTypes properties
Home.propTypes = {
    // Telling that posts is of type array, and it is required, if the type of posts is somethign else, it will throw a proper error in console
    posts: PropTypes.array.isRequired,
}

export default Home;