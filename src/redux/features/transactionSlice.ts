import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

interface Transaction {
    _id: string;
    amount: number;
    status: string;
    createdAt: Date;
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




export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
}});





