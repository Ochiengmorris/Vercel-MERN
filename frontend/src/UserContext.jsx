import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    // useEffect(() => {
    //     if (!user) {
    //         axios.get('/profile').then(({ data }) => {
    //             setUser(data);
    //             setReady(true);
    //         });
    //     }
    // }, []);

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data);
                    setReady(true);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    setReady(true); // Set ready to true even on error
                });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}