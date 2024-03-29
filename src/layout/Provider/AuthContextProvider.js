// // import { createContext, useReducer, useEffect } from 'react';
// import { authReducer } from '../reducer/AuthReducer';
// import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH } from '../context/Constants';
// import axios from 'axios';
// import setAuthToken  from '../utils/setAuthToken';
// import { doc, setDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
// import { app } from "../Firebase";
// import React,{useState,useEffect,createContext} from "react";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../Firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
      console.log("AuthContextProvider",user)
      localStorage.setItem('user', user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  // console.log("UserContext",UserContext)
  return useContext(UserContext);
};

// import {createContext, useReducer, useEffect} from 'react';
// import {authReducer} from '../reducers/AuthReducer';
// import {apiUrl, LOCAL_STORAGE_TOKEN_NAME,SET_AUTH} from './Constants';
// import axios from 'axios';
// import setAuthToken from '../Utils/setAuthToken';

// export const AuthContext = createContext(); 

// const AuthContextProvider = ({children}) =>{
    
    // const [authState, dispatch] = useReducer(authReducer,{
    //     authLoading: true, 
    //     isAutherticated:false, 
    //     userAdmin: null
    // });
    // //Loading user admin
    // const loadingUserAdmin = async() =>{
    //     if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
    //         setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    //     }
    //     try {
    //         const response = await axios.get(`${apiUrl}/admin-acodern`)
    //         if(response.data.success){
    //             dispatch({ 
    //                 type:SET_AUTH,
    //                 payload:{ isAutherticated:true,
    //                 userAdmin:response.data.userAdmin} 
    //             })
    //         }
    //     } catch (error) {
    //         localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    //         setAuthToken(null);
    //         dispatch({ 
    //             type:SET_AUTH,
    //             payload:{isAutherticated:false, userAdmin:null}
    //         })
    //     }
    // }
    // useEffect(() => loadingUserAdmin(),[])
    // //LoginAdmin
    // const loginAdmin = async userAdminForm => {
    //     try {
    //         const response = await axios.post(`${apiUrl}/admin-acodern/login`,userAdminForm);
    //         if(response.data.success) {
    //             localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
    //         }
    //         await loadingUserAdmin();            
    //         return response.data;
    //     } catch (error) {
    //         if(error.response.data) return error.response.data;
    //         else return {success:false, message: error.message};
            
    //     }
    // }
    // //RegisterAdmin
    // const registerAdmin = async userAdminForm => {
    //     try {
    //         const response = await axios.post(`${apiUrl}/admin-acodern/register`,userAdminForm);
    //         if(response.data.success) {
    //             localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
    //         }
    //         await loadingUserAdmin();            
    //         return response.data;
    //     } catch (error) {
    //         if(error.response.data) return error.response.data;
    //         else return {success:false, message: error.message};
            
    //     }
    // }
    // //Logout
    // const logoutAdmin = () =>{
    //     localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    //     dispatch({ 
    //         type:SET_AUTH,
    //         payload:{isAutherticated:false, userAdmin:null}
    //     })
    // }
    // //Context data
    // const authContextData = {loginAdmin:loginAdmin, registerAdmin:registerAdmin, logoutAdmin , authState};

    // //Return provider information
    // return (
    //     <AuthContext.Provider value={authContextData}>
    //         {children}
    //     </AuthContext.Provider>
    // );
// }
// export default AuthContextProvider;
