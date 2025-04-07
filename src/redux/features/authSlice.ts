import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import { getRefreshToken, setAccessToken, setRefreshToken, clearTokens } from '../../utils/cookieService';
import { RootState } from '../store';

// Thunks manquants
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      
      const { accessToken, refreshToken, user } = response.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      return { user, accessToken, refreshToken };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string; first_name: string; last_name: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      
      const { accessToken, refreshToken, user } = response.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      return { user, accessToken, refreshToken };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/profile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No token available');
      }

      const response = await axiosInstance.get('/auth/profil');
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    campus: string;
    role: string;
    bde_member: boolean;
  }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No token available');
      }

      const response = await axiosInstance.put('/auth/settings', userData);
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  'auth/uploadProfilePicture',
  async (formData: FormData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No token available');
      }

      const response = await axiosInstance.post('/auth/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload profile picture');
    }
  }
);

// Interface et état
export interface AuthState {
  user: any;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // États de chargement individuels
  isFetchingProfile: boolean;
  isUpdatingProfile: boolean;
  isUploadingPicture: boolean;
  profile: any | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isFetchingProfile: false,
  isUpdatingProfile: false,
  isUploadingPicture: false,
  profile: null,
};

// Thunk pour le rafraîchissement du token
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = getRefreshToken();
      
      if (!refreshToken) {
        return null;
      }

      const response = await axiosInstance.post('/auth/refresh-token', {}, {
        headers: {
          'x-refresh-token': refreshToken,
        },
      });

      const { accessToken, user } = response.data;
      setAccessToken(accessToken);
      return { user, accessToken };
    } catch (error: any) {
      clearTokens();
      return rejectWithValue(error.response?.data?.message || 'Session expired');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      state.isFetchingProfile = false;
      state.isUpdatingProfile = false;
      state.isUploadingPicture = false;
      clearTokens();
    },
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.isFetchingProfile = false;
      state.isUpdatingProfile = false;
      state.isUploadingPicture = false;
    },
  },
  extraReducers: (builder) => {
    // Gestion du checkAuth
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user;
        state.token = action.payload?.accessToken;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.error = action.payload as string;
      });

    // Gestion du login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Gestion de la registration
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Gestion du profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.isFetchingProfile = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isFetchingProfile = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isFetchingProfile = false;
        state.error = action.payload as string;
      });

    // Gestion de la mise à jour du profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdatingProfile = false;
        state.error = action.payload as string;
      });

    // Gestion de l'upload de la photo de profil
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.isUploadingPicture = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isUploadingPicture = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isUploadingPicture = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
