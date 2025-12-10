'use client';

/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/Firebase";
import useAxiosPublic from "../Components/hooks/useAxiosPublic";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   creat user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   login user with email and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   login with google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //   logout the user
  const logOut = async () => {
    setLoading(true);
    try {
      signOut(auth);
      localStorage.removeItem("token");
    } catch (err) {
      console.log(err);
    }
  };

  //   update user profile name
  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  // get token from server
  const getToken = async (email) => {
    const res = await axiosPublic
      .post(`/jwt`, { email }, { withCredentials: true });
    // console.log(`token response`, res.data)
    localStorage.setItem("token", res.data.token);
    return res.data;
  };

  // set role after login
  useEffect(() => {
    if (user && user?.displayName) {
      const userInfo = {
        name: user.displayName,
        email: user.email,
        role: `member`,
        status: `Accepted`,
      };
      // console.log(userInfo);
      axiosPublic.post(`/users`, userInfo).then((res) => {
        // console.log(res);
      });
    }
  }, [axiosPublic, user]);

  // onAuthStateChange--> Observe the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("CurrentUser-->", currentUser);
      setLoading(false);
      if (currentUser) {
        getToken(currentUser.email);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
