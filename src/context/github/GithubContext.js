import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Get search results
    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`)
        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    // Set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    // Clear Users from state
    const resetUsers = () => dispatch({type: 'RESET_USERS'})


    return (
    <GithubContext.Provider 
        value={{
            users: state.users,
            loading: state.loading,
            searchUsers,
            resetUsers,
        }}
    >
        {children}
    </GithubContext.Provider>
    )
}

export default GithubContext