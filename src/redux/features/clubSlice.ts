import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosConfig";
import { toast } from 'react-hot-toast';

interface Club {
    _id: string;
    name: string;
    description: string;
    logo: {
        url: string;
        alt: string;
    };
    email: string;
    campus: string;
    category: string;
}

interface ClubState {
    clubs: Club[];
    currentClub: Club | null;
    loading: boolean;
    error: string | null;
}

const initialState: ClubState = {
    clubs: [],
    currentClub: null,
    loading: false,
    error: null,
};

// Get all clubs
export const getAllClubs = createAsyncThunk("clubs/getAllClubs", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/clubs/list");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Une erreur est survenue lors de la récupération des clubs");
    }
});

// Get club by id
export const getClubById = createAsyncThunk("clubs/getClubById", async (id: string, { rejectWithValue }) => {
    try {
        console.log('Fetching club with id:', id);
        const response = await axiosInstance.get(`/clubs/${id}`);
        console.log('Club data received:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching club:', error);
        return rejectWithValue(error.response?.data?.message || "Club non trouvé");
    }
});

// Get club by name
export const getClubByName = createAsyncThunk("clubs/getClubByName", async (name: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/clubs/name/${encodeURIComponent(name)}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Club non trouvé");
    }
});

// Create club
export const createClub = createAsyncThunk("clubs/createClub", async(clubData: {name: string, description: string, logo: {url: string, alt: string}, email: string, category: string, campus: string}, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
        const response = await axiosInstance.post("/clubs/create", clubData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Une erreur est survenue lors de la création du club");
    }
});

// Delete club
export const deleteClub = createAsyncThunk("clubs/deleteClub", async (id: string, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
        const response = await axiosInstance.delete(`/clubs/${id}`);
        return response.data;
    } catch (error: any) {
        // Handle specific error cases
        if (error.response?.status === 401) {
            return rejectWithValue("Vous devez être connecté en tant qu'administrateur pour supprimer un club");
        }
        if (error.response?.status === 404) {
            return rejectWithValue("Club non trouvé");
        }
        return rejectWithValue(error.response?.data?.message || "Une erreur est survenue lors de la suppression du club");
    }
});

// Update club
export const updateClub = createAsyncThunk("clubs/updateClub", async ({ id, data }: { id: string, data: Omit<Club, '_id'> }, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
        const response = await axiosInstance.put(`/clubs/${id}`, data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Une erreur est survenue lors de la mise à jour du club");
    }
});

const clubSlice = createSlice({
    name: 'club',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllClubs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllClubs.fulfilled, (state, action) => {
                state.loading = false;
                state.clubs = action.payload;
            })
            .addCase(getAllClubs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(getClubById.pending, (state) => {
                console.log('getClubById pending');
                state.loading = true;
                state.error = null;
            })
            .addCase(getClubById.fulfilled, (state, action) => {
                console.log('getClubById fulfilled:', action.payload);
                state.loading = false;
                state.currentClub = action.payload;
            })
            .addCase(getClubById.rejected, (state, action) => {
                console.log('getClubById rejected:', action.payload);
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(getClubByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClubByName.fulfilled, (state, action) => {
                state.loading = false;
                state.currentClub = action.payload;
            })
            .addCase(getClubByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(deleteClub.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClub.fulfilled, (state, action) => {
                state.loading = false;
                state.clubs = state.clubs.filter(club => club._id !== action.meta.arg);
                toast.success('Club supprimé avec succès');
            })
            .addCase(deleteClub.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            });
    }
});

export default clubSlice.reducer;