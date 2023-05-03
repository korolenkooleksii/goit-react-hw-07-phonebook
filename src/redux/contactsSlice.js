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
    // addContact: {
    //   reducer(state, action) {

    //     const duplicate = state.contacts.items.some(
    //       contact =>
    //         contact.name.toLowerCase() ===
    //         action.payload.name.toLowerCase().trim()
    //     );

    //     if (duplicate) {
    //       toast.warn(`${action.payload.name} is already in contacts.`, {
    //         theme: 'colored',
    //       });
    //     } else {
    //       state.contacts.items.push(action.payload);
    //     }

    //   },
    //   prepare({ name, number }) {
    //     return {
    //       payload: {
    //         name,
    //         number,
    //         id: nanoid(),
    //       },
    //     };
    //   },
    // },
    // removeContact(state, action) {
    //   state.contacts.items = state.contacts.items.filter(
    //     contact => contact.id !== action.payload
    //   );
    // },
    filter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]({ contacts }) {
      contacts.isLoading = true;
    },
    [fetchContacts.fulfilled]({ contacts }, { payload }) {
      contacts.isLoading = false;
      contacts.error = null;
      contacts.items = payload;
    },
    [fetchContacts.error]({ contacts }, { payload }) {
      contacts.isLoading = false;
      contacts.error = payload;
    },
    [addContact.pending]({ contacts }) {
      contacts.isLoading = true;
    },
    [addContact.fulfilled]({ contacts }, { payload }) {
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
    },
    [addContact.error]({ contacts }, { payload }) {
      contacts.isLoading = false;
      contacts.error = payload;
    },
    [deleteContact.pending]({ contacts }) {
      contacts.isLoading = true;
    },
    [deleteContact.fulfilled]({ contacts }, { payload }) {
      contacts.isLoading = false;
      contacts.error = null;
      contacts.items = contacts.items.filter(
        contact => contact.id !== payload.id
      );
    },
    [deleteContact.error]({ contacts }, { payload }) {
      contacts.isLoading = false;
      contacts.error = payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { filter } = contactsSlice.actions;
