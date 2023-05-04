import { createSlice } from '@reduxjs/toolkit';

import { fetchContacts, deleteContact, addContact } from './operations';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    filter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, ({ contacts }) => {
        contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.error = null;
        contacts.items = payload;
      })
      .addCase(fetchContacts.rejected, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.error = payload;
      })
      .addCase(addContact.pending, ({ contacts }) => {
        contacts.isLoading = true;
      })
      .addCase(addContact.fulfilled, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.error = null;

        const duplicate = contacts.items.some(
          contact =>
            contact.name.toLowerCase() === payload.name.toLowerCase().trim()
        );
        if (duplicate) {
          toast.warn(`${payload.name} is already in contacts.`, {
            theme: 'colored',
          });
        } else {
          contacts.items.push(payload);
        }
      })
      .addCase(addContact.rejected, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.error = payload;
      })
      .addCase(deleteContact.pending, ({ contacts }) => {
        contacts.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.error = null;
        contacts.items = contacts.items.filter(
          contact => contact.id !== payload.id
        );
      })
      .addCase(deleteContact.rejected, ({ contacts }, { payload }) => {
        contacts.isLoading = false;
        contacts.error = payload;
      }),
});

export const contactsReducer = contactsSlice.reducer;

export const { filter } = contactsSlice.actions;
