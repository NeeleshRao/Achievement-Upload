import { signInWithPopup,GoogleAuthProvider, onAuthStateChanged, signOut, signInWithRedirect, getRedirectResult } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
const AuthContext=React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [user,setUser]=useState()
    const googleLogin=async ()=>{
        const provider=new GoogleAuthProvider();
        const result=await signInWithPopup(auth,provider)
        // console.log("Hello :",result.user)
        setUser(result.user)
    }

    const logOut=async()=>{
        await signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>setUser(currentUser));
        return unsubscribe
    },[])

    return (
        <AuthContext.Provider value={{googleLogin,logOut,user}}>
            {children}
        </AuthContext.Provider>
    )
}