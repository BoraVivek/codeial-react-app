import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { Comment } from './index';
import { usePosts } from '../hooks';
import { addComment, toggleLike } from '../api';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const Post = ({ post }) => {

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false); //Processing for Likes
  const posts = usePosts();

  const handleAddComment = async (e) => {

    //If Enter is pressed
    if (e.code === 'Enter') {
      //Set Loading to true
      setLoading(true);

      //Call the addComment API Function
      const response = await addComment(post._id, comment);

      //If successful
      if (response.success) {
        toast.success('Comment added successfully'); //Show the success toast
        posts.addCommentToPost(post._id, response.data.comment); //Add the new comment to the post in the posts state
        setComment(''); //Rest the comment value in input box
      } else {
        toast.error('Failed to add comment'); //Show error message
      }

      //Set loading to false
      setLoading(false);
    }

  };

  // Function to process the Like
  const handlePostLikeClick = async () => {
    // Making sure that there is no processing taking place already, to avoid multiple calling
    if (!processing) {
      // Set the processing to true, to prevent simulataneous calls on multiple button clicks.
      setProcessing(true);

      // Toggling the like
      const response = await toggleLike(post._id, 'Post');

      // If deleted, show message that the like has been removed
      if (response.data.deleted) {
        toast.success("Like removed successfully");
      } else {
        // Else, Show message that Like has been added
        toast.success("Like added successfully");
      }

      // Set Processing to false, so that another action can be taken on the like button.
      setProcessing(false);
    }
  }


  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img src='https://www.svgrepo.com/show/255192/profile.svg' alt='user-pic' />
          <div>
            <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>{post.user.name}</Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>
        <div className={styles.postActions}>
          <div className={styles.postLike}>
            {/* Implemented the like button, and on Click we call the handlePostLikeClick Button. */}
            <button onClick={handlePostLikeClick}>
              <img src='https://www.svgrepo.com/show/28731/like.svg' alt='likes-icon' />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img src='https://www.svgrepo.com/show/357086/comments.svg' alt='comments-icon' />
            <span>{post.comments.length}</span>
          </div>
        </div>

        {/* Comment Input Box */}
        <div className={styles.postCommentBox}>
          {/* If Loading, show the adding Comment state, else show the input box */}
          {loading ?
            <input type='text' placeholder='Adding Comment...' disabled value='Adding Comment...' />
            :
            <input type='text' placeholder='Start typing a comment' value={comment}
              onKeyDown={handleAddComment}
              onChange={(e) => setComment(e.target.value)} />
          }
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
  );
};

export default Post;