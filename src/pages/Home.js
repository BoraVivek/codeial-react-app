import styles from "../styles/home.module.css";

const Home = () => {
    return (
        <div className={styles.postList}>
            <div className={styles.postWrapper}>
                <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>
                        <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="user-pic" />
                        <div>
                            <span className={styles.postAuthor}>Akash</span>
                            <span className={styles.postTime}>a minute ago</span>
                        </div>
                    </div>
                    <div className={styles.postContent}>Post Content</div>
                    <div className={styles.postActions}>
                        <div className={styles.postLike}>
                            <img src="https://www.svgrepo.com/show/28731/like.svg" alt="likes-icon" />
                            <span>5</span>
                        </div>

                        <div className={styles.postCommentsIcon}>
                            <img src="https://www.svgrepo.com/show/357086/comments.svg" alt="comments-icon" />
                            <span>2</span>
                        </div>
                    </div>
                    <div className={styles.postCommentBox}>
                        <input type="text" placeholder="Start typing a comment" />
                    </div>

                    <div className={styles.postCommentsList}>
                        <div className={styles.postCommentsItem}>
                            <div className={styles.postCommentHeader}>
                                <span className={styles.postCommentAuthor}>Bill</span>
                                <span className={styles.postCommentTime}>a minute ago</span>
                                <span className={styles.postCommentLikes}>22</span>
                            </div>

                            <div className={styles.postCommentContent}>Random comment</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;