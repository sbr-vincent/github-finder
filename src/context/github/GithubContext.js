import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        repos: [],
        loading: false,
        user: {},
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    return (
    <GithubContext.Provider 
        value={{
            ...state,
            dispatch,
        }}
    >
        {children}
    </GithubContext.Provider>
    )
}

export default GithubContext