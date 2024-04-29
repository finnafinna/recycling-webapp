'use client'
import React from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebase from './firebase_config';
import Loading from '@/components/loading';

const auth = getAuth(firebase)

interface FirebaseUser{
    user: User | null
}

export const AuthContext = React.createContext<FirebaseUser>({ user: null });
export const useAuthContext = () => React.useContext(AuthContext)

interface AuthProps{
    children?: any
}


export const AuthContextProvider: React.FC<AuthProps> = ({children}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                console.log("Set User!")
            } else {
                setUser(null)
                console.log("Cant Set User!")
            }
            setLoading(false)
        });
        return () => unsubscribe()
    }, []);
    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    )
}