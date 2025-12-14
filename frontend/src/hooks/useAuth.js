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
        refetchOnWindowFocus: true, // Check for session validity when tab is focused
        staleTime: 0, // Always check server, don't cache "logged in" state
    });

    // 2. Logout Mutation
    const { mutate: logout, isPending: logoutLoading } = useMutation({
        mutationFn: async () => {
            await axiosInstance.post("/auth/logout/");
        },
        onSuccess: () => {
            // 🔥 FORCE CLEAR THE DATA IMMEDIATELY
            queryClient.setQueryData(["authUser"], null);

            // Ensure no background refetches bring old data back
            queryClient.removeQueries({ queryKey: ["authUser"] });
        },
        onError: () => {
            // If API fails, force logout on frontend anyway
            queryClient.setQueryData(["authUser"], null);
        },
    });

    return { authUser, authLoading, logout, logoutLoading };
};

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axiosInstance from "../lib/axios";

// export const useAuth = () => {
//     const queryClient = useQueryClient();

//     const { data: authUser, isLoading: authLoading } = useQuery({
//         queryKey: ["authUser"],
//         queryFn: async () => {
//             try {
//                 const res = await axiosInstance.get("/auth/me/");
//                 return res.data;
//             } catch (err) {
//                 // 🔥 auto logout on invalid session / deleted user
//                 if (err.response?.status === 401) {
//                     return null;
//                 }
//                 throw err;
//             }
//         },
//         retry: false,
//         refetchOnWindowFocus: true, // important
//     });


//     // const { data: authUser, isLoading: authLoading } = useQuery({
//     //     queryKey: ["authUser"],
//     //     queryFn: async () => {
//     //         try {
//     //             const res = await axiosInstance.get("/auth/me/");

//     //             // EXTRA SAFETY: Check if we actually got an ID
//     //             if (!res.data.id) return null;

//     //             return res.data;
//     //         } catch (err) {
//     //             // If we get 401 (Unauthorized), return null immediately
//     //             return null;
//     //         }
//     //     },
//     //     retry: false,
//     //     refetchOnWindowFocus: true,
//     //     staleTime: 0,
//     // });




//     // // 1. Fetch User Query
//     // const { data: authUser, isLoading: authLoading } = useQuery({
//     //     queryKey: ["authUser"],
//     //     queryFn: async () => {
//     //         try {
//     //             const res = await axiosInstance.get("/auth/me/");
//     //             return res.data;
//     //         } catch (err) {
//     //             return null;
//     //         }
//     //     },
//     //     retry: false,
//     //     refetchOnWindowFocus: false,
//     //     staleTime: 1000 * 60, // 1 minute
//     // });

//     // 2. Logout Mutation
//     const { mutate: logout, isPending: logoutLoading } = useMutation({
//         mutationFn: async () => {
//             await axiosInstance.post("/auth/logout/");
//         },
//         onSuccess: () => {
//             // Clear cache immediately
//             queryClient.setQueryData(["authUser"], null);
//             queryClient.invalidateQueries({ queryKey: ["authUser"] });
//         },
//         onError: (err) => {
//             console.warn("Logout failed", err?.response?.data || err);
//             // Even if API fails, clear local state
//             queryClient.setQueryData(["authUser"], null);
//         },
//     });

//     return { authUser, authLoading, logout, logoutLoading };
// };



