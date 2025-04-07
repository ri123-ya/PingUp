import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";


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

    signup: async (data) => {
        set({ isSigningUp: true });
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account created successfully");
            set({ authUser: res.data });

        } catch (error){
            toast.error("error.respinse.data.message");
        } finally {
            set({ isSigningUp: false});
        }

    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
    
          get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
    },

    logout: async (data)=> {
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({ authUser: null});
            toast.success("Logged put successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))