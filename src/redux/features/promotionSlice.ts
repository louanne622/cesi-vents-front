import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import toast from 'react-hot-toast';

interface Promotion {
    _id: string;
    promotion_code: string;
    validation_date: string;
    max_use: number;
    id_club: string;
    activate: boolean;
    value: number;
}

interface PromotionState {
    promotions: Promotion[];
    currentPromotion: Promotion | null;
    loading: boolean;
    error: string | null;
}

const initialState: PromotionState = {
    promotions: [],
    currentPromotion: null,
    loading: false,
    error: null,
};

// Créer une promotion
export const createPromotion = createAsyncThunk(
    "promotions/createPromotion",
    async ({ promotion_code, validation_date, max_use, id_club, value }: { promotion_code: string, validation_date: string | null, max_use: number, id_club: string, value: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/promotion/create", {
                promotion_code,
                validation_date,
                max_use,
                id_club,
                value
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la création de la promotion");
        }
    }
);

// Obtenir toutes les promotions (admin)
export const getAllPromotions = createAsyncThunk(
    "promotions/getAllPromotions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/promotion/list");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la récupération des promotions");
        }
    }
);

// Obtenir une promotion par code
export const getPromotionByCode = createAsyncThunk(
    "promotions/getPromotionByCode",
    async (promotion_code: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/promotion/code/${promotion_code}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Promotion non trouvée");
        }
    }
);

// Désactiver une promotion (admin)
export const deactivatePromotion = createAsyncThunk(
    "promotions/deactivatePromotion",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/promotion/deactivate/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la désactivation de la promotion");
        }
    }
);

// Activer une promotion (admin)
export const activatePromotion = createAsyncThunk(
    "promotions/activatePromotion",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/promotion/activate/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de l'activation de la promotion");
        }
    }
);

// Vérifier la validité d'une promotion
export const verifyPromotion = createAsyncThunk(
    "promotions/verifyPromotion",
    async (promotion_code: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/promotion/verify/${promotion_code}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Promotion invalide");
        }
    }
);

// Supprimer une promotion (admin)
export const deletePromotion = createAsyncThunk(
    "promotions/deletePromotion",
    async (id: string, { rejectWithValue }) => {
        try {   
            const response = await axiosInstance.delete(`/promotion/delete/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Erreur lors de la suppression de la promotion");
        }
    }
);


const promotionSlice = createSlice({
    name: 'promotion',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Créer une promotion
        builder
            .addCase(createPromotion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPromotion.fulfilled, (state, action) => {
                state.loading = false;
                state.promotions.push(action.payload);
            })
            .addCase(createPromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Obtenir toutes les promotions
        builder
            .addCase(getAllPromotions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPromotions.fulfilled, (state, action) => {
                state.loading = false;
                state.promotions = action.payload;
            })
            .addCase(getAllPromotions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Obtenir une promotion par code
        builder
            .addCase(getPromotionByCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPromotionByCode.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPromotion = action.payload;
            })
            .addCase(getPromotionByCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Désactiver une promotion
        builder
            .addCase(deactivatePromotion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deactivatePromotion.fulfilled, (state, action) => {
                state.loading = false;
                state.promotions = state.promotions.map(promotion => 
                    promotion._id === action.payload._id ? action.payload : promotion
                );
            })
            .addCase(deactivatePromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Activer une promotion
        builder
            .addCase(activatePromotion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(activatePromotion.fulfilled, (state, action) => {
                state.loading = false;
                state.promotions = state.promotions.map(promotion => 
                    promotion._id === action.payload._id ? action.payload : promotion
                );
            })
            .addCase(activatePromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Vérifier la validité d'une promotion
        builder
            .addCase(verifyPromotion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyPromotion.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPromotion = action.payload.promotion;
            })
            .addCase(verifyPromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Supprimer une promotion
        builder
            .addCase(deletePromotion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePromotion.fulfilled, (state, action) => {
                state.loading = false;
                state.promotions = state.promotions.filter(promotion => promotion._id !== action.payload._id);
            })
            .addCase(deletePromotion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default promotionSlice.reducer;
