import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { getAccessToken } from '@/utils/cookieService';

interface Ticket {
    event_id: string;
    user_id: string;
    purchase_date: Date;
    status: string;
    qr_code: string;
}

interface TicketState {
    tickets: Ticket[];
    currentTicket: Ticket | null;
    loading: boolean;
    error: string | null;
}

const initialState: TicketState = {
    tickets: [],
    currentTicket: null,
    loading: false,
    error: null,
};

// Create a new ticket
export const createTicket = createAsyncThunk('ticket/createTicket', async (ticket: Ticket, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/tickets/new', ticket);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Get all tickets for a user
export const getTicketsByUser = createAsyncThunk('ticket/getTicketsByUser', async (userId: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/tickets/user/${userId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Get all tickets for an event
export const getTicketsByEvent = createAsyncThunk('ticket/getTicketsByEvent', async (eventId: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/tickets/event/${eventId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
}); 

// Get all tickets for a club
export const getTicketsByClub = createAsyncThunk('ticket/getTicketsByClub', async (clubId: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/tickets/club/${clubId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
}); 

//tickets d'un utilisateur 
export const fetchUserTickets = createAsyncThunk(
    'ticket/fetchUserTickets',
    async (userId: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/tickets/user/${userId}`);
        return response.data;
      } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Erreur inconnue";
        return rejectWithValue(message);
      }
    }
  );

// delete a ticket      
export const deleteTicket = createAsyncThunk('ticket/deleteTicket', async (ticketId: string, { rejectWithValue }) => {
    const token = getAccessToken();
    try {
        const response = await axiosInstance.delete(`/tickets/${ticketId}`, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTicket.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createTicket.fulfilled, (state, action) => {
            state.loading = false;
            state.tickets.push(action.payload);
        });
        builder.addCase(createTicket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchUserTickets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserTickets.fulfilled, (state, action) => {
            state.loading = false;
            state.tickets = action.payload;
        });
        builder.addCase(getTicketsByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(getTicketsByEvent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTicketsByEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.tickets = action.payload;
        }); 
        builder.addCase(getTicketsByEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(getTicketsByClub.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTicketsByClub.fulfilled, (state, action) => {
            state.loading = false;
            state.tickets = action.payload;
        });
        builder.addCase(getTicketsByClub.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(deleteTicket.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteTicket.fulfilled, (state, action) => {
            state.loading = false;
            state.tickets = state.tickets.filter(ticket => ticket.event_id !== action.payload.event_id);
        })
        builder.addCase(deleteTicket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default ticketSlice.reducer;