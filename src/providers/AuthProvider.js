import {createContext} from 'react';

// Here we are importing the useProvideAuth Hook
import { useProvideAuth } from '../hooks';

// Here we are defining the initialState for our Context
const initialState = {
    user: null, 
    login: () => {},
    logout: () => {},
    loading: true,
}
// Here we are creating our context, and exporting it
export const AuthContext = createContext(initialState);

/* Here we are creating the AuthProvider function, and anything which is present inside the <AuthProvider> JSX Tag will be passed to this function as props.children, which we can then destructure as children. So we can access the passed elements as children.

Using AuthContext.Provider, we are setting the value of our AuthContext which is coming from the useProviderAuth hooks.
*/
export const AuthProvider = ({children}) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}