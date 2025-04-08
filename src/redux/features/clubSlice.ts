import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosConfig";

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


// Get all clubs
export const getAllClubs = createAsyncThunk("clubs/getAllClubs", async (_: void, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
        const response = await axiosInstance.get("/clubs/list");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Une erreur est survenue lors de la récupération des clubs");
    }
});

// Get club by id
export const getClubById = createAsyncThunk("clubs/getClubById", async (id: string, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
        const response = await axiosInstance.get(`/clubs/${id}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Une erreur est survenue lors de la récupération du club");
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
        return rejectWithValue(error.response?.data?.message || "Une erreur est survenue lors de la suppression du club");
    }
});

// Update club
export const updateClub = createAsyncThunk("clubs/updateClub", async (clubData: {id: string, name: string, description: string, logo: {url: string, alt: string}, email: string, campus:string, category:string}, { rejectWithValue }: { rejectWithValue: (value: any) => any }) => {
    try {
        const response = await axiosInstance.put(`/clubs/${clubData.id}`, clubData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Une erreur est survenue lors de la mise à jour du club");
    }
});

const clubSlice = createSlice({
    name: 'club',
    initialState: {
        clubs: [],
        currentClub: null,
        loading: false,
        error: null
    } as ClubState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllClubs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllClubs.fulfilled, (state, action) => {
                state.loading = false;
                state.clubs = action.payload;
            })
            .addCase(getAllClubs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getClubById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getClubById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentClub = action.payload;
            })
            .addCase(getClubById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default clubSlice.reducer;