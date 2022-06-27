import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ticketReducer from '../features/ticket/ticketSlice'
import invoiceReducer from '../features/invoice/invoiceSlice'
import serviceReducer from '../features/service/service.Slice'
export const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    invoice: invoiceReducer,
    service: serviceReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
