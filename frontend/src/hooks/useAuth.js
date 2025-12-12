import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

export const useAuth = () => {
    const queryClient = useQueryClient();

    // 1. Fetch User Query
    const { data: authUser, isLoading: authLoading } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get("/auth/me/");
                return res.data;
            } catch (err) {
                return null;
            }
        },
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 minute
    });

    // 2. Logout Mutation
    const { mutate: logout, isPending: logoutLoading } = useMutation({
        mutationFn: async () => {
            await axiosInstance.post("/auth/logout/");
        },
        onSuccess: () => {
            // Clear cache immediately
            queryClient.setQueryData(["authUser"], null);
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (err) => {
            console.warn("Logout failed", err?.response?.data || err);
            // Even if API fails, clear local state
            queryClient.setQueryData(["authUser"], null);
        },
    });

    return { authUser, authLoading, logout, logoutLoading };
};