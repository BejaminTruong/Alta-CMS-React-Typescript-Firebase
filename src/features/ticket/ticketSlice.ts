import { RootState } from "./../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import { format } from "date-fns";

export interface TicketListType {
  key: string;
  stt: number;
  bookingCode: string;
  ticketNumber: number;
  eventName: string;
  usageDate: string;
  issueDate: string;
  status: string;
  checkInGate: string;
}

interface TicketType {
  ticketList: TicketListType[];
  status: "pending" | "fullfilled" | "rejected";
}

export const fetchData = createAsyncThunk("ticket/get", async () => {
  const querySnapshot = await getDocs(collection(db, "ticket"));
  const data: TicketListType[] = [];
  let index = 1;
  querySnapshot.forEach((doc) => {
    const {
      bookingCode,
      ticketNumber,
      eventName,
      status,
      usageDate,
      issueDate,
      checkInGate,
    } = doc.data();
    data.push({
      key: doc.id,
      stt: index++,
      bookingCode,
      ticketNumber,
      eventName,
      status,
      usageDate: format(usageDate.toDate(), "dd/MM/yyyy"),
      issueDate: format(issueDate.toDate(), "dd/MM/yyyy"),
      checkInGate,
    });
  });
  return data;
});

const initialState = {
  ticketList: [],
  status: "pending",
} as TicketType;

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    filterStatus: (state, action: PayloadAction<string>) => {
      state.ticketList = state.ticketList.filter(
        (e) => e.status.toLowerCase() === action.payload.toLowerCase()
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.status = "fullfilled";
        state.ticketList = payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { filterStatus } = ticketSlice.actions;
export const selectTicket = (state: RootState) => state.ticket.ticketList;
export default ticketSlice.reducer;
