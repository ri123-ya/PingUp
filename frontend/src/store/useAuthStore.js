import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data});

        } catch (error){
            console.log("Error in checking auth",error);
        } finally {
            set({ isCheckingAuth: false});
        }
        
    },
}))