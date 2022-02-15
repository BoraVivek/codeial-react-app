import { useState } from "react";
import styles from "../styles/home.module.css";

const CreatePost = () => {

    // * State for Post & Adding Post
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);

    /**
     * TODO: Implement the functionality to add Post
     */
    const handleAddPostClick = () => {

    }

    return <div className={styles.createPost}>
        <textarea
            className={styles.addPost}
            value={post}
            onChange={(e) => setPost(e.target.value)} />
        <div>
            <button
                onClick={handleAddPostClick}
                disabled={addingPost}
                className={styles.addPostBtn}>
                {addingPost ? 'Adding Post...' : 'Add Post'}
            </button>
        </div>
    </div>
}

export default CreatePost;