import styles from "../styles/home.module.css";
import PropTypes from "prop-types";
import { useAuth, usePosts } from "../hooks";
import { deleteComment } from "../api";
import toast from "react-hot-toast";
import { useState } from "react";

// Returning each comment
const Comment = ({ comment }) => {

    const [processing, setProcessing] = useState(false);
    const auth = useAuth();
    const posts = usePosts();

    // Handles delete Comment Functionality
    const handleDeleteCommentClick = async () => {
        // Process the deletion, only if processing is false, if the deletion is already in process, then don't perform any other click
        if (!processing) {
            setProcessing(true); //Enable the processing state

            // Make an API call to delete the comment
            const response = await deleteComment(comment._id);


            if (response.success) {
                //Show success notification if deletion is successful
                toast.success("Comment Deleted Successfully");

                // Remove the comment from the post in the posts state, so that it re-render the component and remove the comment
                posts.deleteCommentFromPost(comment.post, comment._id);
            } else {
                // Show error notification if deletion is failed.
                toast.error("Failed to delete the comment");
            }

        }
    }

    return (
        <div className={styles.postCommentsItem} >
            <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>{comment.user.name}</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>{comment.likes.length}</span>
            </div>

            <div className={styles.postCommentContent}>
                {comment.content}
                {/* Show delete option only if user is logged in and is the one who has made that particular comment */}
                {auth.user && auth.user._id === comment.user._id ?
                    <img className={styles.deleteComment} src='https://www.svgrepo.com/show/335546/delete.svg' width={16} alt="Delete Comment" onClick={handleDeleteCommentClick} /> : ''
                }
                {/* Show Delete Comment... if comment is being processed for deletion */}
                {processing && <small style={{ color: "red" }}>Deleting Comment...</small>}
            </div>

        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
}

export default Comment;