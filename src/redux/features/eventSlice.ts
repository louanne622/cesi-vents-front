import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

interface Participant {
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  registrationDate: string;
}

type CreateEventData = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxCapacity: number;
  price: number;
  registrationDeadline: string;
  status: 'draft' | 'published' | 'cancelled';
};

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxCapacity: number;
  price: number;
  registrationDeadline: string;
  status: 'draft' | 'published' | 'cancelled';
  createdBy: string;
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
}

interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventState = {
  events: [],
  selectedEvent: null,
  status: 'idle',
  error: null
};

// Créer un nouvel événement
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData: CreateEventData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/events/create', eventData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Erreur inconnue";
      return rejectWithValue(message);
    }
  }
);

// Récupérer tous les événements
export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/events/');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Erreur lors de la récupération des événements');
  }
});

// Récupérer un événement par son ID
export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/events/${eventId}/`);
      return response.data;
    } catch (error: any) {
      // Axios structure l'erreur dans error.response
      const message = error.response?.data?.message || error.message || "Erreur inconnue";
      return rejectWithValue(message);
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    clearEventError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion de fetchEvents
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Gestion de fetchEventById
      .addCase(fetchEventById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedEvent, clearEventError } = eventSlice.actions;
export default eventSlice.reducer;
