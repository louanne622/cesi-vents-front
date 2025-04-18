import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosConfig";
import { UserCreatePayload, UserUpdatePayload } from "@/app/types/User";
import { User } from "@/app/types/User";

interface UserState {
    users: User[];
    currentUser: User | null;
    loading: boolean;
    error: string | null;
}

export const getAllUsers = createAsyncThunk("users/getAllUsers", async (_: void, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
        const response = await axiosInstance.get("/auth/getAllUsers");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erreur serveur");
    }
});

export const addUser = createAsyncThunk(
    'users/AddUser',
    async (userData: UserCreatePayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/addUser", userData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur serveur");
        }
    }
)

export const getUserById = createAsyncThunk(
    'users/getUserById',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/auth/getUserById/${userId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur lors de la récupération de l\'utilisateur');
        }
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, data }: { 
    id: string, 
    data: Partial<UserUpdatePayload>
    }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/auth/updateUser/${id}`, data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erreur serveur");
    }
});

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
     async ({ id }: {id: string}, 
    { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
        const response = await axiosInstance.delete(`/auth/deleteUser/${id}`,
            {
                withCredentials: true,
            }   
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Erreur serveur");
    }
});

export const assignClubToUser = createAsyncThunk(
    "users/assignClubToUser",
    async ({ userId, clubId }: { userId: string, clubId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/auth/assignClub/${userId}`, { clubId });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur serveur");
        }
    }
);  

export const removeClubFromUser = createAsyncThunk(
    "users/removeClubFromUser",
    async ({ userId }: { userId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/auth/deleteClub/${userId}`); 
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur serveur");
        }
    }
);

export const getAllClubMembers = createAsyncThunk(
    "users/getAllClubMembers",
    async ({ clubId }: { clubId: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/auth/getAllClubMembers/${clubId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur serveur");
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        currentUser: null,
        loading: false,
        error: null
    } as UserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Get user by id
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete user
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user._id !== action.meta.arg.id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                })
            // Assign club to user
            .addCase(assignClubToUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignClubToUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(assignClubToUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; 
            })
            // Remove club from user
            .addCase(removeClubFromUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })  
            .addCase(removeClubFromUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(removeClubFromUser.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload as string;
                })
            // Get all club members
            .addCase(getAllClubMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
    }
});


export default userSlice.reducer;