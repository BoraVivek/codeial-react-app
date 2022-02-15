import { useState } from "react";
import toast from "react-hot-toast";
import { addPost } from "../api";
import styles from "../styles/home.module.css";

const CreatePost = () => {

    // * State for Post & Adding Post
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);

    /**
     * Implement the functionality to add Post
     */
    const handleAddPostClick = async () => {
        setAddingPost(true);

        // TODO: Implement Post Validations
        const response = await addPost(post);

        if (response.success) {
            setPost(''); //Clearing the textarea 
            toast.success("Post Created Successfully"); //Showing Notification
        } else {
            toast.error(response.message);
        }

        setAddingPost(false);
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