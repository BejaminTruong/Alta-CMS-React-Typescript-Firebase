import { RootState } from "./../../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { format } from "date-fns";
import { FormValue } from "../../components/ServiceModal";
import { v4 as uuidv4 } from "uuid";
export interface ServiceListType {
  key: string;
  stt: number;
  comboCode: string;
  comboName: string;
  applyDate: string;
  expiryDate: string;
  applyTime: string;
  expiryTime: string;
  ticketPrice: number;
  comboPrice: number;
  comboNumber: number;
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
      applyTime,
      expiryTime,
      ticketPrice,
      comboPrice,
      comboNumber,
      status,
    } = doc.data();
    data.push({
      key: doc.id,
      stt: index++,
      comboCode,
      comboName,
      ticketPrice,
      applyDate: format(applyDate.toDate(), "dd/MM/yyyy"),
      expiryDate: format(expiryDate.toDate(), "dd/MM/yyyy"),
      applyTime,
      expiryTime,
      comboPrice,
      comboNumber,
      status,
    });
  });
  return data;
});

export const addData = createAsyncThunk(
  "service/add",
  async (formValue: FormValue) => {
    await addDoc(collection(db, "service"), {
      ...formValue,
      comboCode: uuidv4().replaceAll("-", "").toUpperCase(),
    });
  }
);

export const updateData = createAsyncThunk(
  "service/update",
  async (formValue: FormValue) => {
    await updateDoc(doc(db, "service", formValue.key as string), formValue);
  }
);

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
