import { RootState } from "./../../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import { format } from "date-fns";

export interface InvoiceListType {
  key: string;
  stt: number;
  ticketNumber: number;
  ticketType: string;
  eventName: string;
  usageDate: string;
  checkInGate: string;
  control: string;
}

interface InvoiceType {
  invoiceList: InvoiceListType[];
  status: "pending" | "fullfilled" | "rejected";
}

export const fetchData = createAsyncThunk("invoice/get", async () => {
  const querySnapshot = await getDocs(collection(db, "invoice"));
  const data: InvoiceListType[] = [];
  let index = 1;
  querySnapshot.forEach((doc) => {
    const {
      ticketNumber,
      eventName,
      ticketType,
      usageDate,
      checkInGate,
      control,
    } = doc.data();
    data.push({
      key: doc.id,
      stt: index++,
      ticketNumber,
      ticketType,
      eventName,
      usageDate: format(usageDate.toDate(), "dd/MM/yyyy"),
      checkInGate,
      control,
    });
  });
  return data;
});

const initialState: InvoiceType = {
  invoiceList: [],
  status: "pending",
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.status = "fullfilled";
        state.invoiceList = payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {} = invoiceSlice.actions;
export const selectInvoice = (state: RootState) => state.invoice.invoiceList;
export default invoiceSlice.reducer;
