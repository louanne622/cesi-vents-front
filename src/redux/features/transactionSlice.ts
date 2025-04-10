import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

interface Transaction {
    userId: string;
    totalAmount: number;
    promoCode: string;
    date: Date;
}

interface TransactionState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    loading: false,
    error: null,
};


//create transaction
export const createTransaction = createAsyncThunk(
    'transaction/createTransaction',
    async (transaction: Transaction) => {
        const response = await axiosInstance.post('/transaction/create', transaction);
        return response.data;
    }
);

//transactions by month
export const getTransactionsByMonth = createAsyncThunk(
    'transaction/getTransactionsByMonth',
    async () => {
        const response = await axiosInstance.get('/transaction/month');
        return response.data;
    }
);

//transaction by years
export const getTransactionsByYear = createAsyncThunk(
    'transaction/getTransactionsByYear',
    async () => {
        const response = await axiosInstance.get('/transaction/year');
        return response.data;
    }
);

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {   
        builder.addCase(createTransaction.pending, (state) => {
            state.loading = true;
        })
        .addCase(createTransaction.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions.push(action.payload);
        })
        .addCase(createTransaction.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getTransactionsByMonth.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTransactionsByMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
        })
        .addCase(getTransactionsByMonth.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to fetch transactions';
        });
        builder.addCase(getTransactionsByYear.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTransactionsByYear.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
        })
        .addCase(getTransactionsByYear.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to fetch transactions';
        });
    }
});

export default transactionSlice.reducer;



