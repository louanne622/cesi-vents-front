import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

interface Goodie {
  _id: string;
  name: string;
  description: string;
  points_cost: number;
  image_url: string;
  stock: number;
  available: boolean;
}

interface Exchange {
  _id: string;
  user_id: string;
  goodie_id: Goodie;
  points_spent: number;
  createdAt: string;
}

interface GoodieState {
  goodies: Goodie[];
  exchanges: Exchange[];
  selectedGoodie: Goodie | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GoodieState = {
  goodies: [],
  exchanges: [],
  selectedGoodie: null,
  status: 'idle',
  error: null,
};

export const fetchGoodies = createAsyncThunk(
  'goodie/fetchGoodies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/goodies');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erreur inconnue';
      return rejectWithValue(message);
    }
  }
);

export const exchangeGoodie = createAsyncThunk(
  'goodie/exchangeGoodie',
  async (goodieId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/goodies/exchange/${goodieId}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erreur inconnue';
      return rejectWithValue(message);
    }
  }
);

export const fetchMyExchanges = createAsyncThunk(
  'goodie/fetchMyExchanges',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/goodies/my-exchanges');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erreur inconnue';
      return rejectWithValue(message);
    }
  }
);

const goodieSlice = createSlice({
  name: 'goodie',
  initialState,
  reducers: {
    clearSelectedGoodie: (state) => {
      state.selectedGoodie = null;
    },
    clearGoodieError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Goodies
      .addCase(fetchGoodies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGoodies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.goodies = action.payload;
      })
      .addCase(fetchGoodies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Exchange Goodie
      .addCase(exchangeGoodie.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(exchangeGoodie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the goodie in the list if it exists
        const exchangedGoodie = action.payload.goodie;
        if (exchangedGoodie) {
          const index = state.goodies.findIndex(g => g._id === exchangedGoodie._id);
          if (index !== -1) {
            state.goodies[index] = exchangedGoodie;
          }
        }
      })
      .addCase(exchangeGoodie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Fetch My Exchanges
      .addCase(fetchMyExchanges.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMyExchanges.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exchanges = action.payload;
      })
      .addCase(fetchMyExchanges.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default goodieSlice.reducer;
