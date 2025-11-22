// TODO: Implement authentication later
// This hook is currently stubbed out to allow the app to build without Firebase auth

const useAuthContext = () => {
  // Return stub auth object
  return {
    user: null,
    loading: false,
    signIn: async () => {
      console.log('Authentication not implemented yet');
    },
    signInWithGoogle: async () => {
      console.log('Google authentication not implemented yet');
    },
    createUser: async () => {
      console.log('User creation not implemented yet');
    },
    logOut: async () => {
      console.log('Logout not implemented yet');
    },
    updateUserProfile: async () => {
      console.log('Profile update not implemented yet');
    },
    setUser: () => {
      console.log('setUser not implemented yet');
    },
    setLoading: () => {
      console.log('setLoading not implemented yet');
    },
  };
};

export default useAuthContext;
