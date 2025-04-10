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
  clubId: string;
  time: string;
  location: string;
  maxCapacity: number;
  price: number;
  registrationDeadline: string;
  status: 'draft' | 'published' | 'cancelled';
  availableTickets: number;
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
  participants: Participant[];
  createdAt: string;
  clubId: string;
  updatedAt: string;
  availableTickets: number;
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

// Créer un événement
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

// Récupérer tous les événements d'un club
export const fetchClubEvents = createAsyncThunk(
  'events/fetchClubEvents',
  async ({ clubId }: { clubId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/events/getAllClubEvents/${clubId}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Erreur inconnue";
      return rejectWithValue(message);
    }
  }
);

// Récupérer un événement par son ID
export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/events/${eventId}/`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Erreur inconnue";
      return rejectWithValue(message);
    }
  }
);

// Modifier un événement
export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, eventData }: { id: string; eventData: Partial<CreateEventData> & { forceUpdate?: boolean } }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/events/${id}/`, eventData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Erreur inconnue";
      return rejectWithValue(message);
    }
  }
);

// Supprimer un événement
export const cancelEvent = createAsyncThunk(
  'events/cancelEvent',
  async (eventId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/events/${eventId}/`);
      return eventId; // retourne juste l'ID supprimé
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Erreur inconnue";
      return rejectWithValue(message);
    }
  }
);

//increase capacity
export const increaseCapacity = createAsyncThunk(
  'events/increaseCapacity',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/events/${eventId}/tickets/increase`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Erreur inconnue";
      return rejectWithValue(message);
    }
  }
);

//decrease capacity
export const decreaseCapacity = createAsyncThunk(
  'events/decreaseCapacity',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/events/${eventId}/tickets/decrease`);
      return response.data;
    } catch (error: any) {
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
      })
      // Gestion de increaseCapacity
      .addCase(increaseCapacity.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(increaseCapacity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEvent = action.payload;
      })
      .addCase(increaseCapacity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Gestion de decreaseCapacity
      .addCase(decreaseCapacity.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(decreaseCapacity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEvent = action.payload;
      })
      .addCase(decreaseCapacity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(createEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(updateEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.events.findIndex(event => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(cancelEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedId = action.payload;
        state.events = state.events.filter(event => event._id !== deletedId);
      })
      .addCase(cancelEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Gestion de increaseCapacity
      .addCase(increaseCapacity.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(increaseCapacity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEvent = action.payload;
      })
      .addCase(increaseCapacity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Gestion de decreaseCapacity
      .addCase(decreaseCapacity.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(decreaseCapacity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEvent = action.payload;
      })
      .addCase(decreaseCapacity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedEvent, clearEventError } = eventSlice.actions;
export default eventSlice.reducer;
