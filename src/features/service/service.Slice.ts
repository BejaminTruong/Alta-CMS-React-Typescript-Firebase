import { RootState } from "./../../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import { format } from "date-fns";

export interface ServiceListType {
  key: string;
  stt: number;
  comboCode: string;
  comboName: string;
  applyDate: string;
  expiryDate: string;
  ticketPrice: number;
  comboPrice: number;
  status: string;
}

interface ServiceType {
  serviceList: ServiceListType[];
  status: "pending" | "fullfilled" | "rejected";
}

export const fetchData = createAsyncThunk("service/get", async () => {
  const querySnapshot = await getDocs(collection(db, "service"));
  const data: ServiceListType[] = [];
  let index = 1;
  querySnapshot.forEach((doc) => {
    const {
      comboCode,
      comboName,
      applyDate,
      expiryDate,
      ticketPrice,
      comboPrice,
      status
    } = doc.data();
    data.push({
      key: doc.id,
      stt: index++,
      comboCode,
      comboName,
      ticketPrice,
      applyDate: format(applyDate.toDate(), "dd/MM/yyyy"),
      expiryDate: format(expiryDate.toDate(), "dd/MM/yyyy"),
      comboPrice,
      status,
    });
  });
  return data;
});

const initialState: ServiceType = {
  serviceList: [],
  status: "pending",
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.status = "fullfilled";
        state.serviceList = payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {} = serviceSlice.actions;
export const selectService = (state: RootState) => state.service.serviceList;
export default serviceSlice.reducer;
