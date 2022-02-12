// import PropTypes from "prop-types";
import styles from "../styles/home.module.css";
import {Comment, Loader} from "../components";
import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { Link } from "react-router-dom";

// We are getting posts in props, so we are de-structuring the props
const Home = () => {

      // State for Posts
  const [posts, setPosts] = useState([]);

  // State for Loading
  const [loading, setLoading] = useState(true);


     //Using React Hook, and calling the getPosts() function to fetch Posts
  useEffect(() => {

    // We can't make useEffect directly as an async, so we define a function inside it and make it async
    const fetchPosts = async () => {

      //Fetching Posts from the API
      const response = await getPosts();

      // If the response is success, then store the posts in posts variable
      if (response.success) {
        setPosts(response.data.posts);
      }

      // Once the content is loaded, set the loading to false.
      setLoading(false);
    }

    //Calling the fetch posts functions
    fetchPosts();

    // [] - Ensures that this hook will be called only once the component is mounted.
  }, []);

   // If the content is still being fetched, then show the loader.
   if (loading) {
    return (
      <Loader />
    );
  }

    return (
        <div className={styles.postList}>
            {/* Looping through the posts */}
            {posts.map((post) => (
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
    );
};

// Defining the propTypes properties
// Home.propTypes = {
//     // Telling that posts is of type array, and it is required, if the type of posts is somethign else, it will throw a proper error in console
//     posts: PropTypes.array.isRequired,
// }

export default Home;