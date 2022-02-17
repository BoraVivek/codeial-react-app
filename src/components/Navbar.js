import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchUsers } from "../api";
import { useAuth } from "../hooks";
import styles from "../styles/navbar.module.css";

const Navbar = () => {

    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Using the authentication hook to verify authentication and perform authentication action like logout
    const auth = useAuth();

    const searchResultBox = useRef(null);
    useOutsideHandler(searchResultBox);

    // Function which removes the search result, if user clicks outside of search results.
    function useOutsideHandler(ref) {
        useEffect(() => {
            /**
             * Hide Search Results, if Users Click out of the search box
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setResults([]);
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    // Seaching for Users as soon as user starts typing in search field
    useEffect(() => {
        // Function which fetches the users
        const fetchUsers = async () => {
            // Make an API Call to search users based on the search text
            const response = await searchUsers(searchText);

            // If response is success, then set the results in results state.
            if (response.success) {
                setResults(response.data.users);
            }
        }

        // If searchtext length is greater than 2, then only make API Call else set the results state to be empty
        if (searchText.length > 2) {
            fetchUsers();
        } else {
            setResults([]);
        }
    }, [searchText]);

    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/" >
                    <img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt="Logo" />
                </Link>
            </div>

            {/* Search User UI */}
            <div className={styles.searchContainer}>
                <img className={styles.searchIcon} src="https://www.svgrepo.com/show/14071/search.svg" alt="Search" />

                <input type="text" placeholder="Search Users" value={searchText} onKeyPressCapture={(e) => { e.key === "Esc" && setResults("") }} onChange={(e) => setSearchText(e.target.value)} />

                {results.length > 0 &&
                    <div className={styles.searchResults} ref={searchResultBox}>
                        <ul>
                            {/* Loop through the users and display their list */}
                            {results.map(user =>
                                <li className={styles.searchResultsRow} key={`user-${user._id}`}>
                                    <Link to={`/user/${user._id}`}>
                                        <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="user-pic" />
                                        <span>{user.name}</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                }
            </div>

            <div className={styles.rightNav}>
                {/* Show User Profile and Name, Only if user is logged in */}
                {auth.user &&
                    <div className={styles.user}>
                        <Link to="/settings">
                            <img src="https://www.svgrepo.com/show/255192/profile.svg" alt="user-pic" className={styles.userDp} />
                        </Link>
                        <span>{auth.user.name}</span>
                    </div>
                }

                <div className={styles.navLinks}>
                    {/* Show Logout when User is logged in, else show Login and Register Links */}
                    <ul>
                        {auth.user ? (
                            <>
                                <li><button onClick={auth.logout}>Logout</button></li>
                            </>) :
                            (<>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>)}

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;